const UserModel = require("../models/user");
const KudoModel = require("../models/kudo");
const dummy = require("mongoose-dummy");

const emailsFromRealUsers = [
  "matthias.ooye@euri.com",
  "silke.venneman@euri.com"
];

const fontFamilies = ["Comic Sans MS", "Times New Roman", "Arial Black"];

module.exports = {
  generate: async function() {
    let promiseList = [];
    //add users
    for (let i = 0; i < 100; i++) {
      let randomUser = dummy(UserModel, {});
      const user = new UserModel(randomUser);
      promiseList.push(user.save());
    }

    await Promise.all(promiseList);
    promiseList = [];

    const users = await UserModel.find({}).exec();

    emailsFromRealUsers.forEach(email => {
      //bestaat kleine kans dat zelfde user 2x wordt gekozen
      let randomUser = users[Math.floor(Math.random() * users.length)];
      randomUser.email = email;
      promiseList.push(randomUser.save());
    });

    // add kudos
    for (let i = 0; i < 20; i++) {
      let randomKudo = dummy(KudoModel, {});
      let kudo = new KudoModel(randomKudo);
      kudo.sender = users[Math.floor(Math.random() * users.length)]._id;
      kudo.receiver = users[Math.floor(Math.random() * users.length)]._id;
      kudo.kudoId = Math.floor(Math.random() * 6) + 1;
      kudo.text = "This is some text for the KUDO!!!!";
      kudo.fontFamily =
        fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
      kudo.status = "unread";
      promiseList.push(kudo.save());
    }

    return Promise.all(promiseList);
  }
};
