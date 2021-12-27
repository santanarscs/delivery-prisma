import { Router } from 'express'
import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman';
import { AuthenticateClientController } from './modules/accounts/authenticateClient/AuthenticateClientController';
import { AuthenticateDeliverymanController } from './modules/accounts/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateClientController } from './modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from './modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { CreateDeliveryController } from './modules/deliveries/useCase/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from './modules/deliveries/useCase/findAllAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from './modules/deliveries/useCase/updateDeliveryman/UpdateDeliverymanController';
import { UpdateEndDateController } from './modules/deliveries/useCase/updateEndDate/UpdateEndDateController';
import { CreateDeliverymanController } from './modules/deliverymans/useCases/createDeliveryman/CreateDeliverymanController';
import { FindAllDeliveriesDeliverymanController } from './modules/deliverymans/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController';

const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const createClientController = new CreateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesClientController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/client/authenticate", authenticateClientController.handle)

routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle)

routes.post("/clients/", createClientController.handle)

routes.post("/deliveryman/", createDeliverymanController.handle)

routes.post("/delivery", ensureAuthenticateClient, createDeliveryController.handle)

routes.get("/delivery/available", ensureAuthenticateDeliveryman, findAllAvailableController.handle)

routes.put("/delivery/updateDeliveryman/:id", ensureAuthenticateDeliveryman, updateDeliverymanController.handle)

routes.get("/clients/deliveries", ensureAuthenticateClient, findAllDeliveriesClientController.handle)

routes.get("/deliveryman/deliveries", ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)

routes.put("/deliveries/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes }