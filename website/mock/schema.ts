/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/p/{placeId}': {
    /** Ottieni informazioni su un luogo */
    get: {
      parameters: {
        path: {
          placeId: string;
        };
      };
      responses: {
        /** Informazioni sul luogo */
        200: {
          content: {
            'application/json': components['schemas']['PlaceInfo'];
          };
        };
        /** Luogo non esistente */
        444: unknown;
      };
    };
    parameters: {
      path: {
        placeId: string;
      };
    };
  };
  '/categories': {
    /** Ottieni la lista di categorie */
    get: {
      responses: {
        /** Lista di categorie */
        200: {
          content: {
            'application/json': components['schemas']['CategoriesList'];
          };
        };
      };
    };
  };
  '/search/p': {
    /** At least one of the 'q' or the 'near' parameters is required */
    get: {
      parameters: {
        query: {
          /** The text for full text search on all fields */
          q?: string;
          /** Latitude and longitude for the search */
          near?: string;
          /** Category filter for the search */
          cat?: string;
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            'application/json': components['schemas']['PlaceList'];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    CategoriesList: {
      categories: string[];
    };
    PlaceList: {
      places?: components['schemas']['PlaceInfo'][];
    };
    PlaceInfo: {
      placeId?: string;
      istatCode?: string;
      building?: string;
      streetName?: string;
      streetNumber?: string;
      city?: string;
      province?: string;
      parkingDiskSpots?: string;
      paidParkingSpots?: string;
      freeParkingSpots?: string;
      disabledParkingSpots?: string;
      parkingSpots?: string;
      notes?: string;
      lat?: string;
      lon?: string;
      searchable?: boolean;
    };
  };
}

export interface operations {}
