// Initialization
import express from 'express';

// Response Handlers
import { okResponse } from '@plugins/server/responses';

// Others
import { map as policyMap } from '@plugins/templates/policies';

// Types
import type { IPolicy } from '@models/policy/types';
import { endpointServer } from '@plugins/server/helpers';

// Router
const router = express.Router();

router.post('/list', (req, res) => {
  okResponse<Readonly<IPolicy>[]>(res, policyMap);
});

// Respond with all the Endpoints in this Route
router.post('/endpoints', (req, res) =>
  new EndpointGenerator(res, router).endpoints(),
);

export default router;
