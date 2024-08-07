# Bulk Import Backend Plugin

This is `bulk-import-backend` plugin which provides Rest API to bulk import catalog entities into the catalog

## For administrators

### Installation and Configuration

#### Setting up the bulk import backend package for the legacy backend

1. Install the NPM Package

```console
# From your backstage root directory
yarn workspace backend add @janus-idp/backstage-plugin-bulk-import-backend
```

1. Create a plugin instance in the `src/packages/backend/plugins/bulk-import.ts` file:

```ts title="src/packages/backend/plugins/bulk-import.ts"
import { HostDiscovery } from '@backstage/backend-common';
import { CatalogClient } from '@backstage/catalog-client';

import { Router } from 'express';

import { BulkImportApi } from '@janus-idp/backstage-plugin-bulk-import-backend';

import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogApi = new CatalogClient({
    discoveryApi: env.discovery,
  });
  return await createRouter({
    config: env.config,
    logger: env.logger,
    permissions: env.permissions,
    catalogApi: env.catalogApi,
  });
}
```

1. Import the plugin into the backend in the `packages/backend/src/index.ts` file:

   ```ts title="packages/backend/src/index.ts"
   /* highlight-add-next-line */
   import bulkImport from './plugins/bulk-import';

   async function main() {
     // ...
     const createEnv = makeCreateEnv(config);
     // ...
     /* highlight-add-next-line */
     const bulkImportEnv = useHotMemoize(module, () => createEnv('bulkImport'));
     // ...
     const apiRouter = Router();
     // ...
     /* highlight-add-next-line */
     apiRouter.use('/bulk-import', await bulkImport(bulkImportEnv));
     // ...
   }
   ```

#### Setting up the bulk import backend package for the new backend

1. Install the bulk import backend plugin using the following command:

   ```console
   yarn workspace backend add @janus-idp/backstage-plugin-bulk-import-backend
   ```

1. Add the following code to the `packages/backend/src/index.ts` file:

   ```ts title="packages/backend/src/index.ts"
   const backend = createBackend();
   /* highlight-add-next-line */
   backend.add(import('@janus-idp/backstage-plugin-bulk-import-backend/alpha'));

   backend.start();
   ```

[//]: # '#### Permission Framework Support'
[//]: #
[//]: # "TODO: Update this section of the documentation as it doesn't work. Not sure how to setup the permission framework on vanilla backstage, but confirmed to work with the RBAC plugin."
[//]: #
[//]: # 'The bulk import backend plugin has support for the permission framework. A basic example permission policy is shown below to disallow access to the bulk import API for all users except those in the `backstage-admins` group. Please note that the This policy should be added to the `packages/backend/src/plugins/permissions.ts` file:'
[//]: #
[//]: # '```ts title="packages/backend/src/plugins/permissions.ts"'
[//]: # "import { createBackendModule } from '@backstage/backend-plugin-api';"
[//]: # "import { BackstageIdentityResponse } from '@backstage/plugin-auth-node';"
[//]: # 'import {'
[//]: # '  AuthorizeResult,'
[//]: # '  isPermission,'
[//]: # '  PolicyDecision,'
[//]: # "} from '@backstage/plugin-permission-common';"
[//]: # 'import {'
[//]: # '  PermissionPolicy,'
[//]: # '  PolicyQuery,'
[//]: # "} from '@backstage/plugin-permission-node';"
[//]: # "import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';"
[//]: #
[//]: # "import { bulkImportPermission } from '@janus-idp/backstage-plugin-bulk-import-common';"
[//]: #
[//]: # 'class BulkImportPermissionPolicy implements PermissionPolicy {'
[//]: # '  async handle('
[//]: # '     request: PolicyQuery,'
[//]: # '     user?: BackstageIdentityResponse,'
[//]: # '   ): Promise<PolicyDecision> {'
[//]: # '     if (isPermission(request.permission, bulkImportPermission)) {'
[//]: # '       if ('
[//]: # '         user?.identity.ownershipEntityRefs.includes('
[//]: # "           'group:default/backstage-admins',"
[//]: # '         )'
[//]: # '       ) {'
[//]: # '         return { result: AuthorizeResult.ALLOW };'
[//]: # '       }'
[//]: # '     }'
[//]: # '     return { result: AuthorizeResult.DENY };'
[//]: # '   }'
[//]: # ' }'
[//]: #
[//]: # ' export const BulkImportPermissionBackendModule = createBackendModule({'
[//]: # "  pluginId: 'permission',"
[//]: # "   moduleId: 'custom-policy',"
[//]: # '   register(reg) {'
[//]: # '     reg.registerInit({'
[//]: # '       deps: { policy: policyExtensionPoint },'
[//]: # '       async init({ policy }) {'
[//]: # '         policy.setPolicy(new BulkImportPermissionPolicy());'
[//]: # '       },'
[//]: # '     });'
[//]: # '   },'
[//]: # ' });'
[//]: # '```'

## For Users

### Usage

The bulk import backend plugin provides a REST API to bulk import catalog entities into the catalog. The API is available at the `/api/bulk-import-backend` endpoint.

As a prerequisite, you need to add at least one GitHub Integration (using either a GitHub token or a GitHub App or both) in your app-config YAML file (or a local `app-config.local.yaml` file).
See https://backstage.io/docs/integrations/github/locations/#configuration and https://backstage.io/docs/integrations/github/github-apps/#including-in-integrations-config for more details.

## REST API

Please refer to [`src/schema/openapi.yaml`](src/schema/openapi.yaml) for the API definition (along with some examples) and the [generated documentation](api-docs/README.md) for more details about the request and response parameters and formats.
