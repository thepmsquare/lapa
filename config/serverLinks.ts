import type { ServerLinks } from "@/types/ServerLinks";
import { v4 as uuid } from "uuid";

const serverLinks: ServerLinks = [
  { id: uuid(), component: "server landing page", link: "https://lapa.live/" },
  { id: uuid(), component: "pgadmin", link: "http://lapa.live:10101/" },
  {
    id: uuid(),
    component: "lapa_database",
    link: "https://lapa.live:10010/docs/",
  },
  {
    id: uuid(),
    component: "lapa_authentication",
    link: "https://lapa.live:10011/docs/",
  },
  {
    id: uuid(),
    component: "lapa_file_store",
    link: "https://lapa.live:10100/docs/",
  },
];

export default serverLinks;
