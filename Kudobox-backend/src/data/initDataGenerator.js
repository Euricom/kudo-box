const UserModel = require("../models/user");
const KudoModel = require("../models/kudo");
const dummy = require("mongoose-dummy");
const usersList = require("../data/users.json");

const fontFamilies = ["Comic Sans MS", "Times New Roman", "Arial Black"];

module.exports = {
  generateUsers: function() {
    let promiseList = [];

    let teller = 0;
    usersList.forEach(user => {
      let u = {
        name: user.displayName,
        email: user.mail
      };
      const newUser = new UserModel(u);
      promiseList.push(newUser.save());
    });

    return Promise.all(promiseList);
  },
  generateKudos: async function() {
    let promiseList = [];
    //add users

    await Promise.all(promiseList);
    promiseList = [];

    const users = await UserModel.find({}).exec();

    // add kudos
    for (let i = 0; i < 1000; i++) {
      let randomKudo = dummy(KudoModel, {});
      let kudo = new KudoModel(randomKudo);
      kudo.sender = users[Math.floor(Math.random() * users.length)]._id;
      kudo.receiver = users[Math.floor(Math.random() * users.length)]._id;
      kudo.kudoId = Math.floor(Math.random() * 3) + 1;
      kudo.text = "This is some text for the KUDO!!!!";
      kudo.fontFamily =
        fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
      kudo.status = "unread";
      promiseList.push(kudo.save());
    }

    return Promise.all(promiseList);
  }
};
