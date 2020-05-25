import TAXA from './taxa';

export type TaxaOptionsType = {
  label: string;
  include: number[];
  exclude?: [];
  isSpecific?: boolean;
};

export const taxaOptions: { [taxa in TAXA]: TaxaOptionsType } = {
  [TAXA.ANIMAL]: {
    label: 'Animal',
    include: [1]
  },
  [TAXA.PLANTS]: {
    label: 'Plants',
    include: [47126]
  },
  [TAXA.FUNGI]: {
    label: 'Fungi',
    include: [47170]
  },
  [TAXA.BIRDS]: {
    label: 'Birds',
    include: [3],
    isSpecific: true
  },
  [TAXA.INSECTS]: {
    label: 'Insects',
    include: [47158],
    isSpecific: true
  },
  [TAXA.MAMMALS]: {
    label: 'Mammals',
    include: [40151],
    isSpecific: true
  },
  [TAXA.CHROMISTS]: {
    label: 'Kelp, Diatoms, and Allies',
    include: [48222],
    isSpecific: true
  },
  [TAXA.BONY_FISHES]: {
    label: 'Bony Fishes',
    include: [47178],
    isSpecific: true
  },
  [TAXA.MOLLUSCS]: {
    label: 'Molluscs',
    include: [47115],
    isSpecific: true
  },
  [TAXA.PROTOZOANS]: {
    label: 'Protozoans',
    include: [47686],
    isSpecific: true
  },
  [TAXA.SHARKS_AND_RAYS]: {
    label: 'Sharks and Rays',
    include: [47273],
    isSpecific: true
  },
  [TAXA.REPTILES]: {
    label: 'Reptiles',
    include: [26036],
    isSpecific: true
  },
  [TAXA.ARACHNIDS]: {
    label: 'Arachnids',
    include: [47119],
    isSpecific: true
  },
  [TAXA.AMPHIBIANS]: {
    label: 'Amphibians',
    include: [20978],
    isSpecific: true
  },
  [TAXA.SEGMENTED_WORMS]: {
    label: 'Segmented Worms',
    include: [47491],
    isSpecific: true
  },
  [TAXA.CEPHALOPODS]: {
    label: 'Cephalopods',
    include: [47459],
    isSpecific: true
  },
  [TAXA.CNIDARIANS]: {
    label: 'Cnidarians',
    include: [47534],
    isSpecific: true
  },
  [TAXA.ECHINODERMS]: {
    label: 'Echninoderm',
    include: [47549],
    isSpecific: true
  }
};
