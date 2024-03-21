"use client";

import styles from "../stylesheets/page.module.css";
import type { Repositories, Repository } from "../types/Repositories";
import repositories from "../config/repositories";
import linkToFetchLastUpdatedOn from "../config/lastUpdatedOn";
import serverLinks from "@/config/serverLinks";
import { useEffect, useState } from "react";
import config from "../config/config";
import type ThemeState from "@/types/ThemeState";
import { Button, Spinner } from "@nextui-org/react";
import { useTheme } from "next-themes";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

export default function Home() {
  // get stuff from local storage

  // state
  const { theme, setTheme } = useTheme();

  const [displayRepos, changeDisplayRepos] = useState<Repositories | undefined>(
    undefined
  );
  const [lastUpdatedText, changeLastUpdatedText] = useState<string | undefined>(
    undefined
  );
  const [mounted, setMounted] = useState(false);

  // functions
  const getVersionNumbers = async () => {
    const repositoriesClone: Repositories = JSON.parse(
      JSON.stringify(repositories)
    );
    repositoriesClone.forEach(
      (ele: Repository) => (ele.latestVersion.version = "")
    );
    for (let i = 0; i < repositoriesClone.length; i++) {
      try {
        if (repositoriesClone[i].latestVersion.type === "pip") {
          const response = await fetch(
            repositoriesClone[i].latestVersion.linkToFetchVersion
          );
          const data = await response.json();
          repositoriesClone[i].latestVersion.version = data.info.version;
        } else if (repositoriesClone[i].latestVersion.type === "npm") {
          const response = await fetch(
            repositoriesClone[i].latestVersion.linkToFetchVersion
          );
          const data = await response.json();
          repositoriesClone[i].latestVersion.version = data["dist-tags"].latest;
        } else {
          // pass
        }
      } catch (error) {
        console.log(error);
        repositoriesClone[i].latestVersion.version = "unable to fetch";
      }
    }
    changeDisplayRepos(repositoriesClone);
  };
  const getLastUpdatedOn = async () => {
    let lastUpdatedOn;
    try {
      const response = await fetch(linkToFetchLastUpdatedOn);
      const data = await response.json();
      lastUpdatedOn = `Last Updated On: ${new Date(
        data.commit.commit.author.date
      ).toLocaleDateString()} by ${data.commit.commit.author.name}`;
    } catch (error) {
      console.log(error);
      lastUpdatedOn = "Last Updated On: unable to fetch";
    }

    changeLastUpdatedText(lastUpdatedOn);
  };
  const toggleThemeState = () => {
    let newThemeState: ThemeState = theme === "dark" ? "light" : "dark";
    setTheme(newThemeState);
    window.localStorage.setItem("theme", newThemeState);
  };
  const setThemeFromLocalStorage = () => {
    let localStorageTheme = window.localStorage.getItem("theme");
    let defaultThemeState: ThemeState;
    if (localStorageTheme !== null) {
      defaultThemeState = localStorageTheme === "dark" ? "dark" : "light";
    } else {
      defaultThemeState = config.defaultThemeState;
      window.localStorage.setItem("theme", config.defaultThemeState);
    }
    setTheme(defaultThemeState);
  };
  // use effect
  useEffect(() => {
    setThemeFromLocalStorage();
    getVersionNumbers();
    getLastUpdatedOn();
    setMounted(true);
  }, []);

  // misc

  // const repoTableColumns: GridColDef[] = [
  //   {
  //     field: "repoName",
  //     headerName: "Repository Name",
  //     minWidth: 280,
  //     flex: 1,
  //   },
  //   {
  //     field: "latestVersion",
  //     headerName: "Latest Version",
  //     minWidth: 80,
  //     flex: 1,
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         params.value.version && (
  //           <Link href={params.value.publicLink} target="_blank">
  //             {params.value.version}
  //           </Link>
  //         )
  //       );
  //     },
  //   },
  //   {
  //     field: "repoOwner",
  //     headerName: "Repository Owner",
  //     minWidth: 100,
  //     flex: 1,
  //   },
  //   {
  //     field: "sourceCodeLink",
  //     headerName: "Source Code Link",
  //     minWidth: 80,
  //     flex: 1,
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         <Link href={params.value.value} target="_blank">
  //           {params.value.isPrivate ? "Private Link" : "Link"}
  //         </Link>
  //       );
  //     },
  //   },
  //   {
  //     field: "previewLink",
  //     headerName: "Preview Link",
  //     minWidth: 100,
  //     flex: 1,
  //     sortable: false,
  //     renderCell: (params) => {
  //       return (
  //         params.value && (
  //           <Link href={params.value} target="_blank">
  //             Link
  //           </Link>
  //         )
  //       );
  //     },
  //   },
  //   {
  //     field: "programmingLanguage",
  //     headerName: "Programming Language",
  //     minWidth: 100,
  //     flex: 1,
  //   },
  // ];

  //   <Link href={params.value} target="_blank">
  //   Link
  // </Link>
  const serverLinksColumns = [
    {
      field: "component",
      headerName: "Component",
    },
    {
      field: "link",
      headerName: "Link",
    },
  ];
  if (!mounted) return null;
  return (
    <main className={styles.main}>
      <p>List of Repositories</p>

      {displayRepos ? (
        "table"
      ) : (
        // <DataGrid
        //   rows={displayRepos}
        //   columns={repoTableColumns}
        //   initialState={{
        //     pagination: {
        //       paginationModel: { page: 0, pageSize: 10 },
        //     },
        //   }}
        //   pageSizeOptions={[10, 20]}
        //   rowSelection={false}
        // />
        <Spinner />
      )}
      <p>Server Links</p>
      <Table aria-label="Table with server links">
        <TableHeader columns={serverLinksColumns}>
          {(column) => (
            <TableColumn key={column.field}>{column.headerName}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={serverLinks}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {lastUpdatedText && <p>{lastUpdatedText}</p>}
      <Button
        color="primary"
        aria-label="theme-toggle"
        onClick={toggleThemeState}
        className={styles.fab}
      >
        {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Button>
    </main>
  );
}
