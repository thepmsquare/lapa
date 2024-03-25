import type { ServerLinks } from "@/types/ServerLinks";
import { v4 as uuid } from "uuid";
const serverLinks: ServerLinks = [
  { id: uuid(), component: "pgadmin", link: "http://43.224.175.127:10101/" },
  {
    id: uuid(),
    component: "lapa_database",
    link: "http://43.224.175.127:10010/docs/",
  },
  {
    id: uuid(),
    component: "lapa_authentication",
    link: "http://43.224.175.127:10011/docs/",
  },
  {
    id: uuid(),
    component: "lapa_file_store",
    link: "http://43.224.175.127:10100/docs/",
  },
];

export default serverLinks;
