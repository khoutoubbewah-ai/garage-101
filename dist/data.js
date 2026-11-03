window.lessons = {
  battery: {
    number: "01", time: "10 MIN", title: "Battery &<br>jump-starting", difficulty: "BEGINNER", anchor: [0.55, 1.14, 1.2],
    summary: "The 12-volt battery starts most cars and powers accessories when the engine is off. Learn the safe cable order before you need it.",
    identify: {
      heading: "Find the battery and its labels",
      text: "Most batteries sit under the hood, but some are in the trunk or beneath a seat. Look for a rectangular case with a red + terminal and a black or unpainted − terminal. Your manual may specify separate jump points.",
      tools: ["Owner’s manual", "Safety glasses", "Work gloves"],
      steps: [
        "Switch off both vehicles, lights, climate control, and accessories.",
        "Identify + and − on both batteries. Do not touch white or blue corrosion bare-handed.",
        "Find an unpainted metal ground point on the disabled car, away from the battery and moving parts."
      ],
      warning: "Never jump a cracked, leaking, frozen, swollen, or badly corroded battery. Hybrids and EVs can have special 12-volt procedures—follow the manual exactly."
    },
    service: {
      heading: "Connect in this exact order",
      text: "Keep the vehicles from touching and the cable clamps from touching each other.",
      tools: ["Rated jumper cables", "Donor vehicle or jump pack"],
      steps: [
        "Red clamp to the disabled battery’s positive (+) terminal.",
        "Other red clamp to the donor battery’s positive (+) terminal.",
        "Black clamp to the donor battery’s negative (−) terminal.",
        "Last black clamp to solid, unpainted metal on the disabled car—not the dead battery.",
        "Start the donor car, wait a minute, then try the disabled car for only a few seconds.",
        "Remove the clamps in the exact reverse order. Keep each clamp isolated."
      ],
      warning: "Stop if cables get hot, spark heavily, smoke, or if you are not certain of polarity. Reversed polarity can cause severe damage or injury."
    },
    maintain: {
      heading: "Make starts boring again",
      text: "Cold Indianapolis mornings expose a weak battery quickly. A slow crank is a reason to test the battery and charging system.",
      tools: ["Terminal brush", "Battery tester (optional)"],
      steps: [
        "Once a month, look for a loose hold-down, cracked case, or corrosion.",
        "Keep the battery top clean and dry. Ask a parts store or shop for a load test if cranking slows.",
        "After a jump, drive only if the car is operating normally and get the charging system checked soon."
      ],
      warning: "Do not disconnect a battery on a running modern car to ‘test’ the alternator. That can damage electronics."
    }
  },
  oil: {
    number: "02", time: "12 MIN", title: "Oil &<br>dipstick", difficulty: "BEGINNER+", anchor: [-0.23, 1.18, 1.05],
    summary: "Oil protects moving engine parts. Checking the level is beginner-friendly; a full change requires safe lifting, the right filter, and the exact specification.",
    identify: {
      heading: "Find the dipstick and fill cap",
      text: "The dipstick often has a bright loop handle. The fill cap usually shows an oil-can symbol. Some newer cars use an electronic level reading instead.",
      tools: ["Owner’s manual", "Paper towel", "Nitrile gloves"],
      steps: [
        "Park level, switch the engine off, and wait as your manual directs so oil drains back.",
        "Pull the dipstick, wipe it clean, fully reinsert it, then remove it again.",
        "Read both sides. The oil should be between the low and full marks; note its level more than its color."
      ],
      warning: "Keep loose clothing, hair, and hands away from belts and fans. An electric fan can start even when the engine is off."
    },
    service: {
      heading: "Top up—or plan a full change",
      text: "Use only the viscosity and performance specification printed in the manual or on the fill cap.",
      tools: ["Correct oil", "Funnel", "Drain pan", "Correct filter", "Torque wrench"],
      steps: [
        "For a top-up, add a small amount, wait, and recheck. Do not overfill.",
        "For a full change, secure the vehicle on ramps or jack stands at approved points—never on a jack alone.",
        "Place the pan, remove the drain plug, drain fully, replace its washer if specified, and torque the plug to spec.",
        "Replace the filter, lubricate its gasket with clean oil if instructed, and tighten exactly as directed.",
        "Refill, run briefly, switch off, wait, recheck the level, and inspect for leaks."
      ],
      warning: "Hot oil burns. Never crawl under a car supported only by a jack. Recycle used oil and the filter—never pour oil into drains, soil, or trash."
    },
    maintain: {
      heading: "Track level, leaks, and interval",
      text: "Oil-life monitors estimate service timing; they do not measure oil level. Check the level periodically and before a long trip.",
      tools: ["Phone reminder", "Service record"],
      steps: [
        "Use the manual’s time or mileage interval and reset the oil-life display only after service.",
        "Look under the parked car for fresh spots and around the filter and drain plug after a change.",
        "If the oil-pressure warning stays on, stop the engine as soon as safely possible and seek help."
      ],
      warning: "An oil-pressure light is not a routine reminder. Continuing to drive may destroy the engine."
    }
  },
  tire: {
    number: "03", time: "20 MIN", title: "Tire, jack<br>& lug nuts", difficulty: "HANDS-ON", anchor: [1.15, 0.46, 1.55],
    summary: "A tire change is simple only when the car is stable and you are away from traffic. Practice finding every tool and lift point at home first.",
    identify: {
      heading: "Find the safe lift points",
      text: "Your manual shows reinforced lift points. Also locate the spare or inflator kit, jack, lug wrench, wheel-lock key, and the pressure label inside the driver’s door jamb.",
      tools: ["Owner’s manual", "Wheel chock", "Gloves", "Flashlight"],
      steps: [
        "Move to firm, level ground far from traffic. Turn on hazard lights.",
        "Set the parking brake. Put an automatic in Park or a manual in gear, and chock the diagonally opposite wheel.",
        "Identify the exact lift point nearest the flat—never guess from appearance alone."
      ],
      warning: "If you cannot get safely away from traffic, stay belted inside when appropriate and call roadside assistance. Do not attempt the change."
    },
    service: {
      heading: "Change the wheel in a stable order",
      text: "Lay the removed wheel under the vehicle’s edge as a secondary precaution, without placing yourself underneath.",
      tools: ["Vehicle jack", "Lug wrench", "Spare tire", "Torque wrench"],
      steps: [
        "While the tire still touches the ground, loosen each lug about a quarter turn.",
        "Place the jack only at the approved point and lift until the tire just clears.",
        "Remove the lugs, pull the wheel straight off, and mount the spare fully against the hub.",
        "Hand-thread every lug. Snug them in a star or crisscross pattern.",
        "Lower until the tire touches and cannot spin; torque in a star pattern to the vehicle’s specification.",
        "Stow everything securely and follow the spare’s speed, distance, and inflation limits."
      ],
      warning: "Never put hands, feet, or any body part under a vehicle held only by a jack. Stop if the jack tilts, sinks, or the car shifts."
    },
    maintain: {
      heading: "Pressure beats guesswork",
      text: "Use the cold pressure on the door-jamb label—not the maximum molded into the tire sidewall.",
      tools: ["Tire gauge", "Portable inflator", "Tread gauge or penny"],
      steps: [
        "Check all four tires and the spare monthly when cold; temperature swings change pressure.",
        "Inspect tread, sidewalls, and valve stems. Bulges, exposed cords, or deep cuts mean do not drive.",
        "After pothole impacts, watch for vibration, pulling, or pressure loss and have the wheel inspected."
      ],
      warning: "A temporary spare has strict limits. Read its label before driving and replace or repair the normal tire promptly."
    }
  },
  wipers: {
    number: "04", time: "8 MIN", title: "Wiper<br>blades", difficulty: "EASY WIN", anchor: [0, 1.63, 0.52],
    summary: "Clear glass is safety equipment. Wiper blades are inexpensive, usually tool-free, and one of the best first jobs for a new car owner.",
    identify: {
      heading: "Match the blade and connector",
      text: "Driver and passenger blades are often different lengths. Confirm the exact fit for your year, make, and model; common connectors include J-hook, push-button, and side-pin.",
      tools: ["Correct replacement blades", "Towel"],
      steps: [
        "Turn the car off with the wipers parked. Use service position if the hood blocks the arms.",
        "Lift one arm gently and place a folded towel on the glass beneath it.",
        "Compare the new blade’s length, curve, and adapter before releasing the old one."
      ],
      warning: "A bare spring-loaded arm can snap down and crack the windshield. Change one blade at a time and never let the arm fall."
    },
    service: {
      heading: "Swap one blade at a time",
      text: "Connector details vary, so use the blade package instructions along with your manual.",
      tools: ["Replacement blade", "Towel"],
      steps: [
        "Press the release tab or open the connector cover.",
        "Slide the old blade in the release direction while supporting the arm.",
        "Fit the correct adapter, click the new blade into place, then tug gently to confirm it is locked.",
        "Lower the arm gently and test with washer fluid—not on dry glass."
      ],
      warning: "Do not force an adapter. If it does not click with light pressure, verify the connector type."
    },
    maintain: {
      heading: "Keep the wiping edge clean",
      text: "Streaking can come from dirty rubber or glass, not only age. Indianapolis ice can tear a blade frozen to the windshield.",
      tools: ["Damp microfiber cloth", "Winter washer fluid"],
      steps: [
        "Wipe the rubber edge and clean the windshield regularly.",
        "Free frozen blades by defrosting and scraping around them—never pull the wiper motor against ice.",
        "Replace blades that chatter, split, skip, or leave persistent streaks."
      ],
      warning: "Use washer fluid rated for freezing weather. Plain water can freeze in the reservoir and lines."
    }
  },
  air: {
    number: "05", time: "10 MIN", title: "Engine<br>air filter", difficulty: "BEGINNER", anchor: [-0.58, 1.15, 1.25],
    summary: "The engine air filter keeps grit out of the engine. It is often housed in a black plastic box and can be replaced with clips or a few screws.",
    identify: {
      heading: "Trace the intake to the air box",
      text: "Look for a large ribbed hose leading from the front or side of the engine bay to a rectangular plastic housing. Your manual identifies the air-cleaner housing.",
      tools: ["Owner’s manual", "Flashlight"],
      steps: [
        "Switch the engine off, remove the key, and let hot parts cool.",
        "Photograph the housing, clips, hoses, and sensor wires before touching anything.",
        "Check that your replacement filter matches the old filter’s shape and part number."
      ],
      warning: "Do not unplug sensors or force brittle plastic clips unless the manual requires it. Never run the engine with the filter removed."
    },
    service: {
      heading: "Lift, clean, seat, close",
      text: "Most filter boxes use clips, screws, or a combination. You usually do not need to disconnect the intake hose.",
      tools: ["Correct filter", "Screwdriver or socket", "Damp cloth"],
      steps: [
        "Release the clips or screws and lift the lid only as far as needed.",
        "Note the old filter’s orientation, remove it, and keep debris from falling into the clean side of the intake.",
        "Wipe the housing with a damp cloth—do not push dirt into the intake.",
        "Seat the new filter flat in its groove. Close the lid evenly and refasten every clip or screw."
      ],
      warning: "A pinched seal lets dirty air bypass the filter. If the lid does not close easily, stop and reseat the filter."
    },
    maintain: {
      heading: "Inspect; don’t judge by color alone",
      text: "Replacement intervals vary with the vehicle and dusty conditions. A light layer of dirt does not always mean the filter is spent.",
      tools: ["Service schedule", "Phone reminder"],
      steps: [
        "Follow the manual’s inspection and replacement schedule.",
        "Replace a filter that is damaged, wet, badly loaded, or no longer seals correctly.",
        "Do not use compressed air unless the filter maker explicitly allows it; it can tear filter media."
      ],
      warning: "The engine filter is different from the cabin filter. Confirm which one your service reminder refers to."
    }
  },
  coolant: {
    number: "06", time: "10 MIN", title: "Coolant<br>system", difficulty: "CAUTION", anchor: [0.34, 1.13, 1.62],
    summary: "Coolant controls engine temperature and prevents freezing and corrosion. The first lesson is knowing when not to open the system.",
    identify: {
      heading: "Find the translucent reservoir",
      text: "The reservoir usually has MIN/MAX or COLD/FULL markings and a warning cap. Some pressurized reservoirs are the system’s fill point; others are overflow tanks.",
      tools: ["Owner’s manual", "Flashlight", "Gloves"],
      steps: [
        "Check only on a level surface with the engine fully cold—ideally before the first drive of the day.",
        "Read the fluid level through the reservoir wall without removing the cap.",
        "Confirm the exact coolant specification; color alone does not identify compatibility."
      ],
      warning: "Never open a radiator or pressurized reservoir cap when the engine is hot. Scalding coolant can erupt without warning."
    },
    service: {
      heading: "Top up only when fully cold",
      text: "A low level may signal a leak. Topping up is not a repair if the level keeps falling.",
      tools: ["Exact specified coolant", "Funnel", "Gloves", "Eye protection"],
      steps: [
        "Verify the engine is stone cold and the cap is safe to open according to the manual.",
        "Use the specified premix, or the exact concentrate-and-water ratio the manual requires.",
        "Add slowly to the cold-fill mark. Do not overfill.",
        "Secure the cap, wipe spills, and monitor the level and temperature gauge on later drives."
      ],
      warning: "Do not mix coolant types based on color. If the temperature warning appears or steam is present, stop safely, switch off, and seek help."
    },
    maintain: {
      heading: "Watch the level and the ground",
      text: "Coolant is typically brightly colored and has a sweet smell, but tasting or direct contact is dangerous.",
      tools: ["Service record", "Cardboard leak spotter"],
      steps: [
        "Check the cold level monthly and before long trips.",
        "Inspect visible hoses for cracks, swelling, crusty residue, or wet spots when the engine is cold.",
        "Follow the time or mileage interval for coolant replacement and system service."
      ],
      warning: "Coolant is poisonous to people and animals. Clean spills immediately and store or recycle it securely."
    }
  },
  lights: {
    number: "07", time: "10 MIN", title: "Lights &<br>signals", difficulty: "BEGINNER", anchor: [-0.68, 0.82, 2.48],
    summary: "Working lights help you see, communicate, and stay legal. A monthly walk-around catches many failures before night or rain does.",
    identify: {
      heading: "Run a complete walk-around",
      text: "Check low beams, high beams, front and rear signals, hazards, brake lamps, reverse lamps, side markers, and the license-plate light.",
      tools: ["Helper or reflective surface", "Clean microfiber cloth"],
      steps: [
        "Park safely, switch on one lighting function at a time, and walk around the car.",
        "Use a helper for brake and reverse lights, or observe their reflection against a garage door.",
        "Note dimness, rapid signal flashing, condensation, cracks, or mismatched color."
      ],
      warning: "Do not stare into bright LED or high-intensity lamps. Keep the car secured before checking reverse lights."
    },
    service: {
      heading: "Replace only the serviceable parts",
      text: "Some bulbs are easy to twist out; sealed LED units may require professional replacement. Access can be from under the hood, trunk, wheel liner, or behind a cover.",
      tools: ["Exact bulb", "Gloves", "Trim tool if specified"],
      steps: [
        "Switch lights and ignition off; let the lamp cool.",
        "Follow the manual to reach the socket without forcing panels or wiring.",
        "Disconnect the plug by its body, not the wires. Remove and replace the bulb in the correct orientation.",
        "For halogen bulbs, keep bare fingers off the glass. Reassemble, test, and confirm any cover seals."
      ],
      warning: "High-voltage HID systems and sealed LED modules are not beginner service items. Use a qualified technician."
    },
    maintain: {
      heading: "Clean lenses; notice patterns",
      text: "A rapid turn-signal flash often indicates a failed bulb, but modern cars may report failures differently.",
      tools: ["Monthly reminder", "Soft cloth"],
      steps: [
        "Add a light check to your monthly tire-pressure routine.",
        "Clean lamp lenses and the rear camera gently; road salt can hide a surprising amount of light.",
        "If bulbs repeatedly fail or a fuse blows again, stop replacing parts and have the circuit diagnosed."
      ],
      warning: "Correct headlamp aim matters. If other drivers flash at you or the road pattern looks wrong, have alignment checked."
    }
  }
};
