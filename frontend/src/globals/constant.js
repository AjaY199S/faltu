/*  ©2020 Ozvid Technologies Pvt. Ltd. All Rights Reserved.Hosted by jiWebHosting.com  */
export const ERRORMSG = "Something went wrong.";
export const LOGOUT = "Are you sure you want to log out?";
export const DELETE = "Are you sure you want to delete record?";
export const DATANOTFOUND = "No record found.";
export const APIBLOCK =
  "SUBSCRIPTION END PLEASE CONTACT WITH Ozvid Technologies Pvt. Ltd.";
export const PERPAGE = 10;
export const SERVERURL = "http://node.toxsl.in:30008/";
export const PAYPALKEY =
  "AfwUnb6JHNmnJR0ZK9M2KVZRy04_J2Af-4BaUMxCj4R5fox8ZT1ybT2-2kW-hVXt57YkZjCslqqbWXTI";
export const PAGES = [
  {
    className: "active",
    href: "",
    value: "Home",
    authenticate: false,
  },
  {
    className: "",
    href: "/search-setup",
    value: "Search",
    authenticate: true,
  },
  {
    className: "",
    href: "/about-us",
    value: "About",
    authenticate: false,
  },
  {
    className: "",
    href: "/profile-setup",
    value: "Profile",
    authenticate: true,
  },
  {
    className: "",
    href: "/matches",
    value: "Matches",
    authenticate: true,
  },
  {
    className: "",
    href: "/message",
    value: "Messages",
    authenticate: true,
  },
  {
    className: "",
    href: "/setting",
    value: "Settings",
    authenticate: true,
  },
  {
    className: "",
    href: "/plans",
    value: "Plans",
    authenticate: false,
  },
];

export const ACTIVITYTOWARDS = [
  {
    className: "dropdown-item",
    value: "Interested in me",
    icon: "icon-hand-o-right pr-2",
    href: "/intrested",
    authenticate: true,
  },
  {
    className: "dropdown-item",
    value: "I am their favourite",
    icon: "icon-hand-o-right pr-2",
    href: "/favourite",
    authenticate: true,
  },
  {
    className: "dropdown-item",
    value: "Viewed my profile",
    icon: "icon-hand-o-right pr-2",
    href: "/profile-view",
    authenticate: true,
  },
];
export const ACTIVITYFROM = [
  {
    className: "dropdown-item",
    value: "My interests",
    icon: "icon-hand-o-right pr-2",
    href: "/my-interest",
    authenticate: true,
  },
  {
    className: "dropdown-item",
    value: "My favorites",
    icon: "icon-hand-o-right pr-2",
    href: "/my-favourite",
    authenticate: true,
  },
  {
    className: "dropdown-item",
    value: "Profiles I have viewed",
    icon: "icon-hand-o-right pr-2",
    href: "/profile-viewed",
    authenticate: true,
  },
  {
    className: "dropdown-item",
    value: "Block List",
    icon: "icon-hand-o-right pr-2",
    href: "/block-list",
    authenticate: true,
  },
];

export const LOGS = [
  {
    className: "bg-primary text-white rounded py-2 spaces",
    href: "/login",
    value: "Log In",
    authenticate: false,
  },
  {
    className: "bg-primary text-white rounded py-2",
    href: "/signup",
    value: "Sign Up",
    authenticate: false,
  },
];

export const HEIGHT = [
  {
    id: "140",
    value: `4'7" (140 cm)`,
  },
  {
    id: "143",
    value: `4'8" (143 cm)`,
  },
  {
    id: "145",
    value: `4'9" (145 cm)`,
  },
  {
    id: "148",
    value: `4'10" (148 cm)`,
  },
  {
    id: "150",
    value: `4'11" (150 cm)`,
  },
  {
    id: "153",
    value: `5' (153 cm)`,
  },
  {
    id: "155",
    value: `5'1" (155 cm)`,
  },
  {
    id: "158",
    value: `5'2" (158 cm)`,
  },
  {
    id: "161",
    value: `5'3" (161 cm)`,
  },
  {
    id: "163",
    value: `5'4" (163 cm)`,
  },
  {
    id: "166",
    value: `5'5" (166 cm)`,
  },
  {
    id: "168",
    value: `5'6" (168 cm)`,
  },
  {
    id: "171",
    value: `5'7" (171 cm)`,
  },
  {
    id: "173",
    value: `5'8" (173 cm)`,
  },
  {
    id: "176",
    value: `5'9" (176 cm)`,
  },
  {
    id: "178",
    value: `5'10" (178 cm)`,
  },
  {
    id: "181",
    value: `5'11" (181 cm)`,
  },
  {
    id: "183",
    value: `6' (183 cm)`,
  },
  {
    id: "186",
    value: `6'1" (186 cm)`,
  },
  {
    id: "188",
    value: `6'2" (188 cm)`,
  },
  {
    id: "191",
    value: `6'3" (191 cm)`,
  },
  {
    id: "191",
    value: `6'3" (191 cm)`,
  },
  {
    id: "194",
    value: `6'4" (194 cm)`,
  },
  {
    id: "196",
    value: `6'5" (196 cm)`,
  },
  {
    id: "199",
    value: `6'6" (199 cm)`,
  },
  {
    id: "201",
    value: `6'7" (201 cm)`,
  },
  {
    id: "204",
    value: `6'8" (204 cm)`,
  },
  {
    id: "206",
    value: `>6'9 (206 cm)`,
  },
  {
    id: "214",
    value: `7' (214 cm)`,
  },
  {
    id: "216",
    value: `7'1" (216 cm)`,
  },
  {
    id: "219",
    value: `7'2" (219 cm)`,
  },
];

export const WEIGHT = [
  {
    id: "88",
    value: `40 kg (88 lb)`,
  },
  {
    id: "90",
    value: `41 kg (90 lb)`,
  },
  {
    id: "93",
    value: `42 kg (93 lb)`,
  },
  {
    id: "95",
    value: `43 kg (95 lb)`,
  },
  {
    id: "97",
    value: `44 kg (97 lb)`,
  },
  {
    id: "99",
    value: `45 kg (99 lb)`,
  },
  {
    id: "104",
    value: `47 kg (104 lb)`,
  },
  {
    id: "106",
    value: `48 kg (106 lb)`,
  },
  {
    id: "108",
    value: `49 kg (108 lb)`,
  },
  {
    id: "110",
    value: `50 kg (110 lb)`,
  },
  {
    id: "112",
    value: `51 kg (112 lb)`,
  },
  {
    id: "115",
    value: `52 kg (115 lb)`,
  },
  {
    id: "117",
    value: `53 kg (117 lb)`,
  },
  {
    id: "119",
    value: `54 kg (119 lb)`,
  },
  {
    id: "121",
    value: `55 kg (121 lb)`,
  },
  {
    id: "123",
    value: `56 kg (123 lb)`,
  },
  {
    id: "126",
    value: `57 kg (126 lb)`,
  },
  {
    id: "128",
    value: `58 kg (128 lb)`,
  },
  {
    id: "130",
    value: `59 kg (130 lb)`,
  },
  {
    id: "132",
    value: `60 kg (132 lb)`,
  },
  {
    id: "134",
    value: `61 kg (134 lb)`,
  },
  {
    id: "137",
    value: `62 kg (137 lb)`,
  },
  {
    id: "139",
    value: `63 kg (139 lb)`,
  },
  {
    id: "141",
    value: `64 kg (141 lb)`,
  },
  {
    id: "143",
    value: `65 kg (143 lb)`,
  },
  {
    id: "146",
    value: `66 kg (146 lb)`,
  },
  {
    id: "148",
    value: `67 kg (148 lb)`,
  },
  {
    id: "150",
    value: `68 kg (150 lb)`,
  },
  {
    id: "152",
    value: `69 kg (152 lb)`,
  },
  {
    id: "154",
    value: `70 kg (154 lb)`,
  },
  {
    id: "157",
    value: `71 kg (157 lb)`,
  },
  {
    id: "159",
    value: `72 kg (159 lb)`,
  },
  {
    id: "161",
    value: `73 kg (161 lb)`,
  },

  {
    id: "163",
    value: `74 kg (163 lb)`,
  },

  {
    id: "165",
    value: `75 kg (165 lb)`,
  },

  {
    id: "168",
    value: `76 kg (168 lb)`,
  },

  {
    id: "170",
    value: `77 kg (170 lb)`,
  },

  {
    id: "172",
    value: `78 kg (172 lb)`,
  },

  {
    id: "174",
    value: `79 kg (174 lb)`,
  },

  {
    id: "176",
    value: `80 kg (176 lb)`,
  },

  {
    id: "179",
    value: `81 kg (179 lb)`,
  },

  {
    id: "181",
    value: `82 kg (181 lb)`,
  },

  {
    id: "183",
    value: `83 kg (183 lb)`,
  },

  {
    id: "185",
    value: `84 kg (185 lb)`,
  },

  {
    id: "187",
    value: `85 kg (187 lb)`,
  },

  {
    id: "190",
    value: `86 kg (190 lb)`,
  },

  {
    id: "192",
    value: `87 kg (192 lb)`,
  },

  {
    id: "194",
    value: `88 kg (194 lb)`,
  },

  {
    id: "196",
    value: `89 kg (196 lb)`,
  },

  {
    id: "198",
    value: `90 kg (198 lb)`,
  },

  {
    id: "201",
    value: `91 kg (201 lb)`,
  },

  {
    id: "203",
    value: `92 kg (203 lb)`,
  },

  {
    id: "205",
    value: `93 kg (205 lb)`,
  },

  {
    id: "207",
    value: `94 kg (207 lb)`,
  },

  {
    id: "209",
    value: `95 kg (209 lb)`,
  },

  {
    id: "212",
    value: `96 kg (212 lb)`,
  },

  {
    id: "214",
    value: `97 kg (214 lb)`,
  },

  {
    id: "216",
    value: `98 kg (216 lb)`,
  },

  {
    id: "218",
    value: `99 kg (218 lb)`,
  },

  {
    id: "220",
    value: `100 kg (220 lb)`,
  },

  {
    id: "225",
    value: `102 kg (225 lb)`,
  },

  {
    id: "227",
    value: `103 kg (227 lb)`,
  },

  {
    id: "229",
    value: `104 kg (229 lb)`,
  },

  {
    id: "231",
    value: `105 kg (231 lb)`,
  },

  {
    id: "234",
    value: `106 kg (234 lb)`,
  },

  {
    id: "236",
    value: `107 kg (236 lb)`,
  },

  {
    id: "238",
    value: `108 kg (238 lb)`,
  },

  {
    id: "240",
    value: `109 kg (240 lb)`,
  },

  {
    id: "243",
    value: `110 kg (243 lb)`,
  },

  {
    id: "245",
    value: `111 kg (245 lb)`,
  },

  {
    id: "247",
    value: `112 kg (247 lb)`,
  },

  {
    id: "249",
    value: `113 kg (249 lb)`,
  },

  {
    id: "251",
    value: `114 kg (251 lb)`,
  },

  {
    id: "254",
    value: `115 kg (254 lb)`,
  },

  {
    id: "256",
    value: `116 kg (256 lb)`,
  },

  {
    id: "223",
    value: `117 kg (258 lb)`,
  },

  {
    id: "260",
    value: `118 kg (260 lb)`,
  },

  {
    id: "262",
    value: `119 kg (262 lb)`,
  },

  {
    id: "265",
    value: `120 kg (265 lb)`,
  },

  {
    id: "267",
    value: `121 kg (267 lb)`,
  },

  {
    id: "269",
    value: `122 kg (269 lb)`,
  },

  {
    id: "271",
    value: `123 kg (271 lb)`,
  },

  {
    id: "273",
    value: `124 kg (273 lb)`,
  },

  {
    id: "276",
    value: `125 kg (276 lb)`,
  },

  {
    id: "278",
    value: `126 kg (278 lb)`,
  },

  {
    id: "280",
    value: `127 kg (280 lb)`,
  },

  {
    id: "282",
    value: `128 kg (282 lb)`,
  },

  {
    id: "284",
    value: `129 kg (284 lb)`,
  },

  {
    id: "287",
    value: `130 kg (287 lb)`,
  },

  {
    id: "289",
    value: `131 kg (289 lb)`,
  },

  {
    id: "291",
    value: `132 kg (291 lb)`,
  },

  {
    id: "293",
    value: `133 kg (293 lb)`,
  },

  {
    id: "295",
    value: `134 kg (295 lb)`,
  },

  {
    id: "298",
    value: `135 kg (298 lb)`,
  },

  {
    id: "300",
    value: `137 kg (302 lb)`,
  },

  {
    id: "304",
    value: `138 kg (304 lb)`,
  },

  {
    id: "306",
    value: `139 kg (306 lb)`,
  },

  {
    id: "309",
    value: `140 kg (309 lb)`,
  },

  {
    id: "311",
    value: `141 kg (311 lb)`,
  },

  {
    id: "313",
    value: `142 kg (313 lb)`,
  },

  {
    id: "315",
    value: `143 kg (315 lb)`,
  },

  {
    id: "317",
    value: `144 kg (317 lb)`,
  },

  {
    id: "320",
    value: `145 kg (320 lb)`,
  },

  {
    id: "322",
    value: `146 kg (322 lb)`,
  },

  {
    id: "324",
    value: `147 kg (324 lb)`,
  },

  {
    id: "326",
    value: `148 kg (326 lb)`,
  },

  {
    id: "328",
    value: `149 kg (328 lb)`,
  },

  {
    id: "331",
    value: `150 kg (331 lb)`,
  },

  {
    id: "333",
    value: `151 kg (333 lb)`,
  },

  {
    id: "335",
    value: `152 kg (335 lb)`,
  },

  {
    id: "337",
    value: `153 kg (337 lb)`,
  },

  {
    id: "340",
    value: `154 kg (340 lb)`,
  },

  {
    id: "342",
    value: `155 kg (342 lb)`,
  },

  {
    id: "344",
    value: `156 kg (344 lb)`,
  },

  {
    id: "346",
    value: `157 kg (346 lb)`,
  },

  {
    id: "348",
    value: `158 kg (348 lb)`,
  },

  {
    id: "351",
    value: `159 kg (351 lb)`,
  },

  {
    id: "353",
    value: `160 kg (353 lb)`,
  },

  {
    id: "355",
    value: `161 kg (355 lb)`,
  },

  {
    id: "357",
    value: `162 kg (357 lb)`,
  },

  {
    id: "359",
    value: `163 kg (359 lb)`,
  },

  {
    id: "362",
    value: `164 kg (362 lb)`,
  },

  {
    id: "364",
    value: `165 kg (364 lb)`,
  },

  {
    id: "366",
    value: `166 kg (366 lb)`,
  },

  {
    id: "368",
    value: `167 kg (368 lb)`,
  },

  {
    id: "370",
    value: `168 kg (370 lb)`,
  },

  {
    id: "373",
    value: `169 kg (373 lb)`,
  },

  {
    id: "375",
    value: `170 kg (375 lb)`,
  },

  {
    id: "377",
    value: `171 kg (377 lb)`,
  },

  {
    id: "379",
    value: `172 kg (379 lb)`,
  },

  {
    id: "300",
    value: `381 kg (381 lb)`,
  },

  {
    id: "384",
    value: `174 kg (384 lb)`,
  },

  {
    id: "386",
    value: `175 kg (386 lb)`,
  },

  {
    id: "388",
    value: `176 kg (388 lb)`,
  },

  {
    id: "390",
    value: `177 kg (390 lb)`,
  },

  {
    id: "392",
    value: `178 kg (392 lb)`,
  },

  {
    id: "395",
    value: `179 kg (395 lb)`,
  },

  {
    id: "397",
    value: `180 kg (397 lb)`,
  },

  {
    id: "399",
    value: `181 kg (399 lb)`,
  },

  {
    id: "401",
    value: `182 kg (401 lb)`,
  },

  {
    id: "403",
    value: `183 kg (403 lb)`,
  },

  {
    id: "406",
    value: `184 kg (406 lb)`,
  },

  {
    id: "408",
    value: `185 kg (408 lb)`,
  },

  {
    id: "410",
    value: `186 kg (410 lb)`,
  },

  {
    id: "412",
    value: `187 kg (412 lb)`,
  },

  {
    id: "414",
    value: `188 kg (414 lb)`,
  },

  {
    id: "419",
    value: `190 kg (419 lb)`,
  },

  {
    id: "421",
    value: `191 kg (421 lb)`,
  },

  {
    id: "423",
    value: `192 kg (423 lb)`,
  },

  {
    id: "425",
    value: `193 kg (425 lb)`,
  },

  {
    id: "428",
    value: `194 kg (428 lb)`,
  },

  {
    id: "430",
    value: `195 kg (430 lb)`,
  },

  {
    id: "432",
    value: `196 kg (432 lb)`,
  },

  {
    id: "434",
    value: `197 kg (434 lb)`,
  },

  {
    id: "437",
    value: `198 kg (437 lb)`,
  },

  {
    id: "439",
    value: `199 kg (439 lb)`,
  },

  {
    id: "300",
    value: `200 kg (441 lb)`,
  },

  {
    id: "443",
    value: `201 kg (443 lb)`,
  },

  {
    id: "445",
    value: `202 kg (445 lb)`,
  },

  {
    id: "448",
    value: `203 kg (448 lb)`,
  },

  {
    id: "450",
    value: `204 kg (450 lb)`,
  },

  {
    id: "452",
    value: `205 kg (452 lb)`,
  },

  {
    id: "454",
    value: `206 kg (454 lb)`,
  },

  {
    id: "456",
    value: `207 kg (456 lb)`,
  },

  {
    id: "459",
    value: `208 kg (459 lb)`,
  },

  {
    id: "461",
    value: `209 kg (461 lb)`,
  },

  {
    id: "463",
    value: `210 kg (463 lb)`,
  },

  {
    id: "465",
    value: `211 kg (465 lb)`,
  },

  {
    id: "467",
    value: `212 kg (467 lb)`,
  },

  {
    id: "470",
    value: `213 kg (470 lb)`,
  },

  {
    id: "472",
    value: `214 kg (472 lb)`,
  },

  {
    id: "474",
    value: `215 kg (474 lb)`,
  },

  {
    id: "476",
    value: `216 kg (476 lb)`,
  },

  {
    id: "478",
    value: `217 kg (478 lb)`,
  },

  {
    id: "481",
    value: `218 kg (481 lb)`,
  },

  {
    id: "483",
    value: `219 kg (483 lb)`,
  },

  {
    id: "485",
    value: `220 kg (485 lb)`,
  },
];
export const AGE = [
  `18`,
  `19`,
  `20`,
  `21`,
  `22`,
  `23`,
  `24`,
  `25`,
  `26`,
  `27`,
  `28`,
  `29`,
  `30`,
  `31`,
  `32`,
  `33`,
  `34`,
  `35`,
  `36`,
  `37`,
  `38`,
  `39`,
  `40`,
  `41`,
  `42`,
  `43`,
  `44`,
  `45`,
  `46`,
  `47`,
  `48`,
  `49`,
  `50`,
  `51`,
  `52`,
  `53`,
  `54`,
  `55`,
  `56`,
  `57`,
  `58`,
  `59`,
  `60`,
  `61`,
  `62`,
  `63`,
  `64`,
  `65`,
  `66`,
  `67`,
  `68`,
  `69`,
  `70`,
  `71`,
  `72`,
  "73",
  `74`,
  `75`,
  `76`,
  `77`,
  `78`,
  `79`,
  `80`,
  `81`,
  `82`,
  `83`,
  `84`,
  `85`,
  `86`,
  `87`,
  `88`,
  `89`,
  `90`,
  `91`,
  `92`,
  `93`,
  `94`,
  `95`,
  `96`,
  `97`,
  `98`,
  `99`,
];
export const ENGLISHSPEAKINGARRAY = [
  "Botswana",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gambia",
  "Ghana",
  "Liberia",
  "Tanzania",
];
export const ISLANDARRAY = [
  "Fiji",
  "Kiribati",
  "Micronesia",
  "Nauru",
  "Palau",
  "americaSamoa",
  "Samoa",
  "Tokelau",
  "Tuvalu",
  "Vanuatu",
];
export const MIDDLEARRAY = [
  "bahrainIsland",
  "Iraq",
  "Israel",
  "Kuwait",
  "Qatar",
  "Syria",
  "Turkey",
  "Yemen",
];
export const NORTHAMERICAARRAY = ["Canada", "unitedStates"];
export const CENTRALARRAY = [
  "Afghanistan",
  "Azerbaijan",
  "Azerbaijan",
  "Kazakhstan",
  "Uzbekistan",
  "Tajikistan",
  "Turkmenistan",
];
export const LATINARRAY = [
  "Argentina",
  "brazilandBarbuda",
  "Chile",
  "costaRica",
  "dominicaRebublic",
  "Guatemala",
  "Paraguay",
  "Uruguay",
  "paraguayMaarten",
  "mexicoIslands",
];
export const WESTERNARRAY = [
  "Andorra",
  "Belgium",
  "Estonia",
  "Finland",
  "Greece",
  "Ireland",
  "Liechtenstein",
];
export const EASTERNARRAY = [
  "Albania",
  "Armenia",
  "Croatia",
  "Poland",
  "Slovakia",
  "Slovenia",
  "Ukraine",
  "Moldova",
];
export const CARIIBBEANARRAY = [
  "Anguilla",
  "Belize",
  "antihuandbarbuda",
  "Guyana",
  "Aruba",
  "Jamaica",
  "Bahamas",
  "sintMaarten",
  "Barbados",
  "virginIsland",
];
export const AUSTRALIAARRAY = ["Australia", "newzealand"];
export const ASIAARRAY = [
  "Bangladesh",
  "Bhutan",
  "China",
  "India",
  "Brunei",
  "Indonesia",
  "Cambodia",
  "Maldives",
];

export function seconds_to_days_hours_mins_secs_str(seconds) {
  let days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * (24 * 60 * 60);
  let hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * (60 * 60);
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  seconds = seconds.toFixed(0);
  return (
    (0 < days ? days + " day, " : "") +
    hours +
    "h, " +
    minutes +
    "m and " +
    seconds +
    "s"
  );
}

export function DIFFYRS(dt1) {
  let dt2 = new Date();
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.floor(diff / 365.25);
}
