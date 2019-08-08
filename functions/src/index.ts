import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getGoogleNews } from "google-data-scraper";

admin.initializeApp(functions.config().firebase);

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.createUserFavorites = functions.auth.user().onCreate(user => {
  admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .create({
      favorites: []
    })
    .then(() => {
      console.log("success");
    })
    .catch(() => {
      console.log("error");
    });
});

export const updateGoogleNews = functions.https.onRequest(
  (request, response) => {
    const topicsList = [];
    admin
      .firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.data().favorites.forEach(fav => {
            topicsList.push(fav);
          });
        });
      })
      .then(() => {
        const uniqueTopics = topicsList.map(t =>
          t.toLowerCase().replace(/\s\s+/g, " ")
        );
        const uniqueTopicsList = Array.from(new Set(uniqueTopics));
        const ref = admin.firestore().collection("googleNews");
        let isError = false;
        getGoogleNews(uniqueTopicsList).then(data => {
          data.forEach(result => {
            ref
              .doc(result.searchPhrase)
              .set(result)
              .then(() => {
                isError = isError || false;
              })
              .catch(() => {
                isError = isError || true;
              });
          });

          if (isError) {
            response.status(501);
          }
          response.status(200);
        });
      })
      .catch(() => {
        response.status(501);
      });
  }
);
