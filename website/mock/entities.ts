import { components } from './schema';
import * as faker from 'faker';

export function PlaceList(): components['schemas']['PlaceList'] {
  const places = [];

  for (let i = 0; i < 50; i++) {
    places.push(PlaceInfo());
  }

  return {
    places,
  };
}

export function PlaceInfo(placeId?: string): components['schemas']['PlaceInfo'] {
  return {
    placeId: placeId ?? faker.random.word(),
    city: faker.address.city(),
    streetName: faker.address.streetAddress(),
    streetNumber: faker.datatype.number().toString(),
    province: faker.address.county(),
    lat: faker.address.latitude(),
    lon: faker.address.longitude(),
    building: faker.random.word(),
    parkingDiskSpots: '50',
    paidParkingSpots: '50',
    freeParkingSpots: '50',
    disabledParkingSpots: '',
    parkingSpots: '50',
    notes: faker.random.words(10),
    istatCode: `${faker.datatype.string(1)}${faker.datatype.number(999)}`,
  };
}
export function CategoriesList(): components['schemas']['CategoriesList'] {
  return {
    categories: [
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
      'Esposizioni Permanenti',
      'Percorsi e proposte didattiche',
      'Territorio',
    ],
  };
}
