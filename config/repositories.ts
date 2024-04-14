import type { Repositories } from "../types/Repositories";
import { v4 as uuid } from "uuid";

const repositories: Repositories = [
  {
    id: uuid(),
    repoName: "lapa",
    latestVersion: {
      linkToFetchVersion: "",
      type: "empty",
      publicLink: "",
    },
    repoOwner: "thePmSquare",
    sourceCodeLink: {
      value: "https://github.com/lavvsharma/lapa",
      isPrivate: false,
    },
    previewLink: "https://lavvsharma.github.io/lapa",
    programmingLanguage: "Node.js",
  },
  {
    id: uuid(),
    repoName: "lapa_database",
    latestVersion: {
      linkToFetchVersion: "https://pypi.org/pypi/lapa_database/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/lapa_database/",
    },
    repoOwner: "thePmSquare",
    sourceCodeLink: {
      value: "https://github.com/thepmsquare/lapa_database",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "lapa_database_structure",
    latestVersion: {
      linkToFetchVersion: "https://pypi.org/pypi/lapa_database_structure/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/lapa_database_structure/",
    },
    repoOwner: "Amish Palkar",
    sourceCodeLink: {
      value: "https://github.com/B21amish/lapa_database_structure",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "lapa_database_helper",
    latestVersion: {
      linkToFetchVersion: "https://pypi.org/pypi/lapa_database_helper/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/lapa_database_helper/",
    },
    repoOwner: "thePmSquare",
    sourceCodeLink: {
      value: "https://github.com/thepmsquare/lapa_database_helper",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "lapaDatabaseHelper",
    latestVersion: {
      linkToFetchVersion: "https://registry.npmjs.org/lapadatabasehelper/",
      type: "npm",
      publicLink: "https://www.npmjs.com/package/lapadatabasehelper",
    },
    repoOwner: "Amish Palkar",
    sourceCodeLink: {
      value: "https://github.com/B21amish/lapaDatabaseHelper",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Node.js",
  },
  {
    id: uuid(),
    repoName: "lapa_file_store",
    latestVersion: {
      linkToFetchVersion: "https://pypi.org/pypi/lapa_file_store/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/lapa_file_store/",
    },
    repoOwner: "Aaditya Shetty",
    sourceCodeLink: {
      value: "https://github.com/adityashetty35/lapa_file_store",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "lapa_file_store_helper",
    latestVersion: {
      linkToFetchVersion: "https://pypi.org/pypi/lapa_file_store_helper/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/lapa_file_store_helper/",
    },
    repoOwner: "thePmSquare",
    sourceCodeLink: {
      value: "https://github.com/thepmsquare/lapa_file_store_helper",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "lapaFileStoreHelper",
    latestVersion: {
      linkToFetchVersion: "https://registry.npmjs.org/lapafilestorehelper/",
      type: "npm",
      publicLink: "https://www.npmjs.com/package/lapafilestorehelper/",
    },
    repoOwner: "Aaditya Shetty",
    sourceCodeLink: {
      value: "https://github.com/lavvsharma/lapaFileStoreHelper",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Node.js",
  },
  {
    id: uuid(),
    repoName: "lapa_authentication",
    latestVersion: {
      linkToFetchVersion: "https://pypi.org/pypi/lapa_authentication/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/lapa_authentication/",
    },
    repoOwner: "Amish Palkar",
    sourceCodeLink: {
      value: "https://github.com/lavvsharma/lapa_authentication",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "lapa_authentication_helper",
    latestVersion: {
      linkToFetchVersion:
        "https://pypi.org/pypi/lapa_authentication_helper/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/lapa_authentication_helper/",
    },
    repoOwner: "Amish Palkar",
    sourceCodeLink: {
      value: "https://github.com/B21amish/lapa_authentication_helper",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "lapaAuthenticationHelper",
    latestVersion: {
      linkToFetchVersion:
        "https://registry.npmjs.org/lapaauthenticationhelper/",
      type: "npm",
      publicLink: "https://www.npmjs.com/package/lapaauthenticationhelper",
    },
    repoOwner: "Aaditya Shetty",
    sourceCodeLink: {
      value: "https://github.com/adityashetty35/lapaAuthenticationHelper",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Node.js",
  },
  {
    id: uuid(),
    repoName: "lapa_deployment",
    latestVersion: {
      linkToFetchVersion: "",
      type: "empty",
      publicLink: "",
    },
    repoOwner: "thePmSquare",
    sourceCodeLink: {
      value: "https://github.com/thepmsquare/lapa_deployment",
      isPrivate: true,
    },
    previewLink: "https://hub.docker.com/repositories/thepmsquared",
    programmingLanguage: "Docker",
  },
  {
    id: uuid(),
    repoName: "lapa_commons",
    latestVersion: {
      linkToFetchVersion: "https://pypi.org/pypi/lapa_commons/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/lapa_commons/",
    },
    repoOwner: "Amish Palkar",
    sourceCodeLink: {
      value: "https://github.com/lavvsharma/lapa_commons/",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "square_logger",
    latestVersion: {
      linkToFetchVersion: "https://pypi.org/pypi/square_logger/json",
      type: "pip",
      publicLink: "https://pypi.org/pypi/square_logger/",
    },
    repoOwner: "thePmSquare",
    sourceCodeLink: {
      value: "https://github.com/thepmsquare/square_logger",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Python",
  },
  {
    id: uuid(),
    repoName: "lapaChat",
    latestVersion: null,
    repoOwner: "Amish Palkar",
    sourceCodeLink: {
      value: "https://github.com/B21amish/lapaChat",
      isPrivate: false,
    },
    previewLink: null,
    programmingLanguage: "Node.js",
  },
];

export default repositories;
