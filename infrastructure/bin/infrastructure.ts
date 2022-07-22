#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { InfrastructureStack, InfrastructureStackProps } from '../lib/infrastructure-stack';

const DATA_URLS = [
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_schio_parcheggi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/parcheggi_nel_comune_di_thiene.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_valdagno_parcheggi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/Comune_di_Isola_Vicentina_Parcheggi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_monte_di_malo_parcheggi.csv',
  'https://dati.veneto.it/SpodCkanApi/api/1/rest/dataset/comune_di_malo_parcheggi.csv',
];

const env: cdk.Environment = {
  account: '<ACCOUNT_ID>',
  region: 'eu-west-1',
};

const app = new cdk.App();
cdk.Tags.of(app).add('project', 'PSBAPP');

/////// STACK DI SVILUPPO

// default props for all dev env: customizable afterwards
function makeDefaultDevProps(ownerName: string, ownerEmail: string): InfrastructureStackProps {
  return {
    env,
    endUserWebApp: {
      domain: `prklot-${ownerName.toLowerCase()}.example.org`,
      buildCommand: 'testBuild',
      shouldCacheS3: false,
      zoneName: undefined, // route53 is not in the same account
      certificateArn: '<ARN_CERTIFICATO>',
      apiBaseUrl: `/api`,
    },
    description: `Development Stack for Pasubio App - PrkLot owned by ${ownerName}`,
    destroyOnRemoval: true,
    csvDataUrls: JSON.stringify(DATA_URLS),
    locationMapArn: '<ARN_MAPPA>',
    searchProps: {
      indexPrefix: ownerName,
      reuseDomainAttributes: {
        domainArn: '<ARN_DOMINIO>',
        domainEndpoint: '<ENDPOINT_DOMINIO>',
      },
    },
    alarmEmail: ownerEmail,
  };
}

// an object with all dev props
const devProps: { [ownerEmail: string]: InfrastructureStackProps } = {
  'user@example.org': makeDefaultDevProps('user', 'user@example.org'),
};

// creates a stack for each dev
for (const ownerEmail of Object.keys(devProps)) {
  const ownerName = ownerEmail.split('@')[0].replace('.', ''); // from n.cognome@mail.com to ncognome
  const stackName = `PSBAPPPrkLotDev${ownerName}`;
  const props = devProps[ownerEmail];
  const stack = new InfrastructureStack(app, stackName, props);
  cdk.Tags.of(stack).add('referente', ownerEmail);
  cdk.Tags.of(stack).add('owner', ownerEmail);
  cdk.Tags.of(stack).add('project', 'PSBAPP');
  cdk.Tags.of(stack).add('environment', 'dev');
}
