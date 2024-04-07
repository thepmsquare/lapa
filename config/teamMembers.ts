import type { TeamMembers } from "../types/TeamMembers";
import { v4 as uuid } from "uuid";

import adityashetty35 from "../public/static/avatars/adityashetty35.png";
import B21amish from "../public/static/avatars/B21amish.png";
import lavvsharma from "../public/static/avatars/lavvsharma.jpeg";
import thepmsquare from "../public/static/avatars/thepmsquare.png";

const introText: string =
  "We are a group of programmers building an end-to-end encrypted chat app from the ground up. Leveraging our design and coding skills, we're creating a safe and user-friendly platform. Our unique twist? Custom-built components with modular application design. All while continuing to learn and iterate throughout the development process.";

const teamMembers: TeamMembers = [
  {
    id: uuid(),
    imageSrc: lavvsharma.src,
    name: "Lav Sharma",
    userName: "lavvsharma",
    link: "https://github.com/lavvsharma/",
    about: "There's no place like 127.0.0.1 🤓",
  },
  {
    id: uuid(),
    imageSrc: B21amish.src,
    name: "Amish Palkar",
    userName: "B21amish",
    link: "https://github.com/b21amish/",
    about: "",
  },
  {
    id: uuid(),
    imageSrc: thepmsquare.src,
    name: "Parth Mangtani",
    userName: "thepmsquare",
    link: "https://thepmsquare.github.io/",
    about: "right angles only :)",
  },

  {
    id: uuid(),
    imageSrc: adityashetty35.src,
    name: "Aaditya Shetty",
    userName: "adityashetty35",
    link: "https://github.com/adityashetty35/",
    about: "",
  },
];
export { introText, teamMembers };
