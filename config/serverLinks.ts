import type { ServerLinks } from "@/types/ServerLinks";
import { v4 as uuid } from "uuid";

const serverLinks: ServerLinks = [
  { id: uuid(), component: "pgadmin", link: "http://111.125.236.217:10101/" },
  {
    id: uuid(),
    component: "lapa_database",
    link: "https://111.125.236.217:10010/docs/",
  },
  {
    id: uuid(),
    component: "lapa_authentication",
    link: "https://111.125.236.217:10011/docs/",
  },
  {
    id: uuid(),
    component: "lapa_file_store",
    link: "https://111.125.236.217:10100/docs/",
  },
];

export default serverLinks;
