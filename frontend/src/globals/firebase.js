import firebase from "firebase";

let firebaseConfig_dev = {
  apiKey: "AIzaSyCwV2z3nnc6TeBCVdcCjRN5nVj4CWv1IVA",
  authDomain: "fir-chat-5db3c.firebaseapp.com",
  databaseURL: "https://fir-chat-5db3c.firebaseio.com",
  projectId: "fir-chat-5db3c",
  storageBucket: "fir-chat-5db3c.appspot.com",
  messagingSenderId: "194474221509",
  appId: "1:194474221509:web:5a66c5b062dba736f735ac",
  measurementId: "G-9T4SQPM6H2",
};

let firebaseConfig_production = {
  apiKey: "AIzaSyCwV2z3nnc6TeBCVdcCjRN5nVj4CWv1IVA",
  authDomain: "fir-chat-5db3c.firebaseapp.com",
  databaseURL: "https://fir-chat-5db3c.firebaseio.com",
  projectId: "fir-chat-5db3c",
  storageBucket: "fir-chat-5db3c.appspot.com",
  messagingSenderId: "194474221509",
  appId: "1:194474221509:web:5a66c5b062dba736f735ac",
  measurementId: "G-9T4SQPM6H2",
};

var firebaseConfig_sg05 = {
  apiKey: "AIzaSyCwV2z3nnc6TeBCVdcCjRN5nVj4CWv1IVA",
  authDomain: "fir-chat-5db3c.firebaseapp.com",
  databaseURL: "https://fir-chat-5db3c.firebaseio.com",
  projectId: "fir-chat-5db3c",
  storageBucket: "fir-chat-5db3c.appspot.com",
  messagingSenderId: "194474221509",
  appId: "1:194474221509:web:5a66c5b062dba736f735ac",
  measurementId: "G-9T4SQPM6H2",
};

const hostname = window.location.hostname;
let config = "";
if (hostname === "ucinvc.kontess.com") {
  config = firebaseConfig_production;
} else if (hostname === "node.toxsl.in") {
  config = firebaseConfig_sg05;
} else {
  config = firebaseConfig_dev;
}
firebase.initializeApp(config);
const database = firebase.database();
export default database;
