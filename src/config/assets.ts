// Drop real photos into /public/images and set the path here. Empty string = labelled placeholder slot.
export const assets = {
  logo: '', // e.g. '/images/neotech-logo.svg'
  heroMachine: '/images/injection-moulding-machine.jpg',
  factory: '/images/factory-floor.jpg',
  catMobility: '/images/mobility-ev-components.jpg',
  catElectrical: '/images/electrical-components.jpg',
  catAppliance: '/images/quality-inspection.jpg',
  quality: '/images/quality-inspection.jpg',
  ind: {
    automotive: '/images/mobility-ev-components.jpg',
    ev: '/images/mobility-ev-components.jpg',
    electrical: '/images/electrical-components.jpg',
    appliances: '/images/quality-inspection.jpg',
    infrastructure: '/images/electrical-components.jpg',
    industrial: '/images/quality-inspection.jpg',
    agriculture: '/images/mobility-ev-components.jpg',
  } as Record<string, string>,
}

