import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { AppDataSource } from "./data-source";
import router from "./routes";
import helmet from "helmet";
import { appConfig } from "./config/app";
import moment from "moment";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    // call middlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // register express routes from defined application routes
    app.use(router);

    // setup express app here
    // ...

    // start express server
    app.listen(appConfig.appPort, () => {
      console.log(
        `Express server has started on port ${appConfig.appPort}. Open http://localhost:${appConfig.appPort}/users to see results`
      );
    });
    // insert new users for test
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     username: 'Sahas',
    //     role: UserRole.ADMIN,
    //     password: bcrypt.hashSync('sahas', 10),
    //   }),
    // );
  })
  .catch((error) => console.log(error));
