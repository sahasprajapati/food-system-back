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
    type FoodTime = `${number | ""}${number}:${number}${number} ${"AM" | "PM"}`;

    const st: FoodTime = "9:00 AM";
    const s: FoodTime = "9:00 PM";
    const et = "4:00 PM";
    const ct = "8:00 AM";
    const ct2 = "14:00 PM";

    const sm = moment(st, "LT");
    const em = moment(et, "LT");
    const cm = moment(ct, "LT");
    const cm2 = moment(ct2, "LT");
    const cm3 = moment();

    // const lt = moment("1:00 AM", "LT");

    console.log("Moment", moment().format("LT"));
    console.log("Moment", moment("1:00 AM", "LT").format("LT"));
    console.log("Moment", moment.duration(em.diff(sm)).asHours());
    console.log("Moment", moment.duration(em.diff(cm)).asHours());
    console.log("Moment", moment.duration(cm.diff(em)).asHours());
    console.log("Moment", moment.duration(cm.diff(sm)).asHours());

    console.log("Moment", moment.duration(cm2.diff(em)).asHours());
    console.log("Moment", moment.duration(cm2.diff(sm)).asHours());

    console.log("Moment", moment.duration(cm3.diff(em)).asHours());
    console.log("Moment", cm3.format("LT"));
    console.log("Moment", moment.duration(cm3.diff(sm)).asHours());
    // console.log(
    //   "Moment",
    //   moment("13:00 PM", "LT").format("LT") - moment().format("LT")
    // );
    // create express app
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
