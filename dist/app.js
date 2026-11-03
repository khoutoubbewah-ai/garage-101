const lessons = window.lessons;
const lessonOrder = Object.keys(lessons);
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const canvas = $("#car-canvas");
const wrap = $("#canvas-wrap");
const ctx = canvas.getContext("2d");

let activePart = "battery";
let activeTab = "identify";
let yaw = -0.62;
let targetYaw = yaw;
let dragging = false;
let dragX = 0;
let moved = 0;
let soundOn = false;
let toastTimer;
let hotspotPositions = {};
const completed = new Set(JSON.parse(localStorage.getItem("garage101-complete") || "[]"));

function renderLesson() {
  const lesson = lessons[activePart];
  const section = lesson[activeTab];
  $("#lesson-kicker").textContent = `STATION ${lesson.number} · ${lesson.time}`;
  $("#lesson-title").innerHTML = lesson.title;
  $("#lesson-difficulty").textContent = lesson.difficulty;
  $("#lesson-summary").textContent = lesson.summary;
  $("#lesson-body").innerHTML = `
    <h3>${section.heading}</h3>
    <p>${section.text}</p>
    <div class="tool-chips">${section.tools.map(tool => `<span>${tool}</span>`).join("")}</div>
    <ol>${section.steps.map(step => `<li>${step}</li>`).join("")}</ol>
    <div class="safety-callout"><b>STOP &amp; CHECK:</b> ${section.warning}</div>
    <div class="lesson-note"><span><b>Vehicle-specific?</b> Confirm locations, capacities, torque values, fluid specifications, and reset procedures in your owner’s manual.</span></div>`;

  $$(".station").forEach(button => button.classList.toggle("active", button.dataset.part === activePart));
  $$(".lesson-tabs button").forEach(button => {
    const selected = button.dataset.tab === activeTab;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });

  const practiced = completed.has(activePart);
  const practiceButton = $("#practice-button");
  practiceButton.classList.toggle("done", practiced);
  practiceButton.querySelector("b").textContent = practiced ? "PRACTICED" : "MARK PRACTICED";
  updateProgress();
}

function updateProgress() {
  $("#progress-count").textContent = completed.size;
  $("#progress-bar").style.width = `${(completed.size / lessonOrder.length) * 100}%`;
  $$(".station").forEach(button => button.classList.toggle("complete", completed.has(button.dataset.part)));
}

function selectPart(part, announce = false) {
  if (!lessons[part]) return;
  activePart = part;
  activeTab = "identify";
  renderLesson();
  if (announce) {
    const cleanTitle = lessons[part].title.replace(/<br>/g, " ").replace(/&amp;/g, "&");
    showToast(`${cleanTitle} selected`);
  }
  playClick(330);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function playClick(frequency = 440) {
  if (!soundOn) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audio = new AudioContextClass();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.035, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.07);
  oscillator.connect(gain).connect(audio.destination);
  oscillator.start();
  oscillator.stop(audio.currentTime + 0.07);
}

function shade(hex, amount) {
  const value = parseInt(hex.slice(1), 16);
  const red = Math.max(0, Math.min(255, (value >> 16) + amount));
  const green = Math.max(0, Math.min(255, ((value >> 8) & 255) + amount));
  const blue = Math.max(0, Math.min(255, (value & 255) + amount));
  return `rgb(${red},${green},${blue})`;
}

function project(point) {
  const [x, y, z] = point;
  const cosine = Math.cos(yaw);
  const sine = Math.sin(yaw);
  const rotatedX = x * cosine - z * sine;
  const rotatedZ = x * sine + z * cosine;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const scale = Math.min(width / 7.5, height / 4.3);
  return {
    x: width / 2 + rotatedX * scale,
    y: height * 0.55 - y * scale + rotatedZ * scale * 0.28,
    z: rotatedZ,
    scale
  };
}

function cuboid(centerX, centerY, centerZ, sizeX, sizeY, sizeZ, color, alpha = 1) {
  const points = [
    [centerX-sizeX/2, centerY-sizeY/2, centerZ-sizeZ/2], [centerX+sizeX/2, centerY-sizeY/2, centerZ-sizeZ/2],
    [centerX+sizeX/2, centerY+sizeY/2, centerZ-sizeZ/2], [centerX-sizeX/2, centerY+sizeY/2, centerZ-sizeZ/2],
    [centerX-sizeX/2, centerY-sizeY/2, centerZ+sizeZ/2], [centerX+sizeX/2, centerY-sizeY/2, centerZ+sizeZ/2],
    [centerX+sizeX/2, centerY+sizeY/2, centerZ+sizeZ/2], [centerX-sizeX/2, centerY+sizeY/2, centerZ+sizeZ/2]
  ].map(project);
  const faces = [
    { indexes:[0,1,2,3], color:shade(color,-34) }, { indexes:[4,5,6,7], color:shade(color,6) },
    { indexes:[0,4,7,3], color:shade(color,-18) }, { indexes:[1,5,6,2], color:shade(color,-5) },
    { indexes:[3,2,6,7], color:shade(color,22) }
  ].map(face => ({ ...face, z: face.indexes.reduce((sum, index) => sum + points[index].z, 0) / 4 }))
   .sort((a, b) => a.z - b.z);

  ctx.save();
  ctx.globalAlpha = alpha;
  faces.forEach(face => {
    ctx.beginPath();
    face.indexes.forEach((index, i) => i ? ctx.lineTo(points[index].x, points[index].y) : ctx.moveTo(points[index].x, points[index].y));
    ctx.closePath();
    ctx.fillStyle = face.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.16)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  ctx.restore();
}

function polygon3d(points, fill, stroke = "rgba(255,255,255,.08)") {
  const projected = points.map(project);
  ctx.beginPath();
  projected.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.stroke();
}

function drawWheel(point, isFar = false) {
  const projected = project(point);
  const scale = projected.scale;
  ctx.save();
  ctx.globalAlpha = isFar ? 0.72 : 1;
  ctx.translate(projected.x, projected.y);
  ctx.rotate(-yaw * 0.22);
  ctx.fillStyle = "#11110f";
  ctx.beginPath();
  ctx.ellipse(0, 0, scale * 0.34, scale * 0.43, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#3c3c36";
  ctx.lineWidth = scale * 0.06;
  ctx.stroke();
  ctx.fillStyle = "#c3c0b6";
  ctx.beginPath();
  ctx.ellipse(0, 0, scale * 0.18, scale * 0.23, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#77766f";
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    ctx.rotate(Math.PI * 2 / 5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -scale * 0.2);
    ctx.stroke();
  }
  ctx.fillStyle = "#35352f";
  ctx.beginPath();
  ctx.arc(0, 0, scale * 0.055, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCar() {
  const body = "#e85f2c";
  const farSide = Math.sin(yaw) > 0 ? 1 : -1;
  drawWheel([farSide * 1.05, 0.47, -1.68], true);
  drawWheel([farSide * 1.05, 0.47, 1.62], true);
  cuboid(0, 0.67, 0, 2.18, 0.72, 5.05, body);
  cuboid(0, 1.02, 1.53, 2.05, 0.22, 1.85, body);
  cuboid(0, 0.98, -2, 2.06, 0.24, 1, body);
  polygon3d([[-0.9,1.03,-1.28],[0.9,1.03,-1.28],[0.76,1.88,-0.72],[-0.76,1.88,-0.72]], "#202727");
  polygon3d([[-0.76,1.88,-0.72],[0.76,1.88,-0.72],[0.78,1.88,0.5],[-0.78,1.88,0.5]], "#292c2a");
  polygon3d([[-0.78,1.88,0.5],[0.78,1.88,0.5],[0.93,1.06,0.88],[-0.93,1.06,0.88]], "#263233");
  polygon3d([[-0.98,1.08,-1.25],[-0.8,1.82,-0.7],[-0.8,1.82,0.46],[-1,1.08,0.72]], "#202829");
  polygon3d([[0.98,1.08,-1.25],[0.8,1.82,-0.7],[0.8,1.82,0.46],[1,1.08,0.72]], "#202829");
  polygon3d([[-1.02,0.78,2.53],[1.02,0.78,2.53],[0.98,1.08,2.46],[-0.98,1.08,2.46]], shade(body, -12));
  [-0.67, 0.67].forEach(x => {
    const light = project([x, 0.84, 2.56]);
    ctx.fillStyle = "#f4e19b";
    ctx.beginPath();
    ctx.ellipse(light.x, light.y, light.scale * 0.22, light.scale * 0.08, -yaw * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,.7)";
    ctx.stroke();
  });
  const nearSide = -farSide;
  drawWheel([nearSide * 1.08, 0.47, -1.68]);
  drawWheel([nearSide * 1.08, 0.47, 1.62]);
  const wiperStart = project([-0.55, 1.5, 0.66]);
  const wiperEnd = project([0.5, 1.5, 0.66]);
  ctx.strokeStyle = "#090908";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(wiperStart.x, wiperStart.y);
  ctx.lineTo(wiperEnd.x, wiperEnd.y);
  ctx.stroke();

  if (["battery", "oil", "air", "coolant"].includes(activePart)) {
    const hood = project([0, 1.28, 1.45]);
    ctx.save();
    ctx.fillStyle = "rgba(200,220,78,.12)";
    ctx.strokeStyle = "rgba(200,220,78,.4)";
    ctx.setLineDash([5, 6]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(hood.x, hood.y, hood.scale * 1.05, hood.scale * 0.42, -yaw * 0.24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

function drawFloor() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.save();
  ctx.translate(width / 2, height * 0.75);
  ctx.scale(1, 0.22);
  ctx.fillStyle = "rgba(0,0,0,.46)";
  ctx.beginPath();
  ctx.ellipse(0, 0, Math.min(width * 0.34, 300), Math.min(width * 0.34, 300), 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = "rgba(255,255,255,.035)";
  ctx.lineWidth = 1;
  for (let i = -7; i <= 7; i += 1) {
    const start = project([i, -0.02, -4]);
    const end = project([i, -0.02, 4]);
    ctx.beginPath(); ctx.moveTo(start.x, start.y); ctx.lineTo(end.x, end.y); ctx.stroke();
  }
  for (let z = -4; z <= 4; z += 1) {
    const start = project([-7, -0.02, z]);
    const end = project([7, -0.02, z]);
    ctx.beginPath(); ctx.moveTo(start.x, start.y); ctx.lineTo(end.x, end.y); ctx.stroke();
  }
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function drawHotspots() {
  hotspotPositions = {};
  lessonOrder.forEach(part => {
    const point = project(lessons[part].anchor);
    hotspotPositions[part] = point;
    const isActive = part === activePart;
    const pulse = 1 + Math.sin(Date.now() / 400) * 0.08;
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.fillStyle = isActive ? "rgba(239,106,50,.19)" : "rgba(200,220,78,.12)";
    ctx.beginPath(); ctx.arc(0, 0, (isActive ? 27 : 21) * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = isActive ? "#ef6a32" : "#c8dc4e";
    ctx.beginPath(); ctx.arc(0, 0, isActive ? 12 : 9, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#171713";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, isActive ? 5 : 3.5, 0, Math.PI * 2); ctx.stroke();
    if (isActive) {
      const label = lessons[part].title.replace(/<br>/g, " ").replace(/&amp;/g, "&").toUpperCase();
      ctx.font = "800 9px Manrope, sans-serif";
      const labelWidth = ctx.measureText(label).width + 22;
      const labelX = point.x + labelWidth + 25 > canvas.clientWidth ? -labelWidth - 18 : 18;
      ctx.fillStyle = "rgba(23,23,19,.88)";
      roundedRect(ctx, labelX, -13, labelWidth, 26, 13);
      ctx.fill();
      ctx.fillStyle = "#fffdf6";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(label, labelX + 11, 1);
    }
    ctx.restore();
  });
}

function resizeCanvas() {
  const rectangle = wrap.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rectangle.width * pixelRatio);
  canvas.height = Math.round(rectangle.height * pixelRatio);
  canvas.style.width = `${rectangle.width}px`;
  canvas.style.height = `${rectangle.height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  draw();
}

function draw() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height) return;
  ctx.clearRect(0, 0, width, height);
  drawFloor();
  drawCar();
  drawHotspots();
}

function updateViewLabel() {
  const angle = ((yaw % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  let label = "SIDE VIEW";
  if (angle < 0.5 || angle > 5.8) label = "FRONT VIEW";
  else if (angle < 1.2 || angle > 5.1) label = "FRONT ¾ VIEW";
  else if (angle > 2 && angle < 4.2) label = "REAR VIEW";
  $("#view-label").textContent = label;
}

function animate() {
  const difference = targetYaw - yaw;
  if (Math.abs(difference) > 0.001) yaw += difference * 0.12;
  draw();
  updateViewLabel();
  requestAnimationFrame(animate);
}

$$(".station").forEach(button => button.addEventListener("click", () => selectPart(button.dataset.part, true)));
$$(".lesson-tabs button").forEach(button => button.addEventListener("click", () => {
  activeTab = button.dataset.tab;
  renderLesson();
  playClick(480);
}));

$("#next-button").addEventListener("click", () => {
  const index = lessonOrder.indexOf(activePart);
  selectPart(lessonOrder[(index + 1) % lessonOrder.length]);
  $("#lesson-panel").scrollIntoView({ behavior: "smooth", block: "nearest" });
});

$("#practice-button").addEventListener("click", () => {
  if (completed.has(activePart)) {
    completed.delete(activePart);
    showToast("Practice mark removed");
  } else {
    completed.add(activePart);
    showToast("Nice work — station marked practiced");
    playClick(620);
  }
  localStorage.setItem("garage101-complete", JSON.stringify([...completed]));
  renderLesson();
});

$("#rotate-left").addEventListener("click", () => { targetYaw -= Math.PI / 4; });
$("#rotate-right").addEventListener("click", () => { targetYaw += Math.PI / 4; });
$("#reset-view").addEventListener("click", () => { targetYaw = -0.62; });
$("#sound-toggle").addEventListener("click", event => {
  soundOn = !soundOn;
  event.currentTarget.setAttribute("aria-pressed", String(soundOn));
  event.currentTarget.setAttribute("aria-label", soundOn ? "Turn interface sounds off" : "Turn interface sounds on");
  playClick(520);
});

wrap.addEventListener("pointerdown", event => {
  dragging = true;
  dragX = event.clientX;
  moved = 0;
  wrap.classList.add("dragging");
  wrap.setPointerCapture(event.pointerId);
});
wrap.addEventListener("pointermove", event => {
  if (!dragging) return;
  const difference = event.clientX - dragX;
  dragX = event.clientX;
  moved += Math.abs(difference);
  targetYaw += difference * 0.008;
  $("#canvas-hint").style.opacity = "0";
});
wrap.addEventListener("pointerup", event => {
  dragging = false;
  wrap.classList.remove("dragging");
  if (moved < 8) {
    const rectangle = canvas.getBoundingClientRect();
    const x = event.clientX - rectangle.left;
    const y = event.clientY - rectangle.top;
    let nearest = null;
    let nearestDistance = 38;
    Object.entries(hotspotPositions).forEach(([part, point]) => {
      const distance = Math.hypot(point.x - x, point.y - y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = part;
      }
    });
    if (nearest) selectPart(nearest, true);
  }
});

$$('[data-practice]').forEach(input => {
  const key = `garage101-${input.dataset.practice}`;
  input.checked = localStorage.getItem(key) === "true";
  input.addEventListener("change", () => {
    localStorage.setItem(key, String(input.checked));
    showToast(input.checked ? "Checklist item saved" : "Checklist item cleared");
  });
});

window.addEventListener("resize", resizeCanvas);
if ("ResizeObserver" in window) new ResizeObserver(resizeCanvas).observe(wrap);
renderLesson();
resizeCanvas();
animate();
