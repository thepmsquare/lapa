"use client";
import styles from "../stylesheets/page.module.css";
import type { Repositories, Repository } from "../types/Repositories";
import repositories from "../config/repositories";
import linkToFetchLastUpdatedOn from "../config/lastUpdatedOn";
import serverLinks from "@/config/serverLinks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Link,
  Typography,
  Skeleton,
  StyledEngineProvider,
  Fab,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import config from "../config/config";
import type ThemeState from "@/types/ThemeState";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function Home() {
  // get stuff from local storage

  // state
  const [themeState, changeThemeState] = useState(config.defaultThemeState);

  const [displayRepos, changeDisplayRepos] = useState<Repositories | undefined>(
    undefined
  );
  const [lastUpdatedText, changeLastUpdatedText] = useState<string | undefined>(
    undefined
  );

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
    let newThemeState: ThemeState = themeState === "dark" ? "light" : "dark";
    changeThemeState(newThemeState);
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
    changeThemeState(defaultThemeState);
  };
  // use effect
  useEffect(() => {
    setThemeFromLocalStorage();
    getVersionNumbers();
    getLastUpdatedOn();
  }, []);

  // misc

  let currentTheme = createTheme({
    palette: {
      mode: themeState,
    },
    typography: {
      fontFamily: config.defaultFont,
      h2: {
        fontFamily: config.defaultFontHeadings,
      },
      h6: {
        fontFamily: config.defaultFontHeadings,
      },
    },
  });
  const repoTableColumns: GridColDef[] = [
    {
      field: "repoName",
      headerName: "Repository Name",
      flex: 1,
    },
    {
      field: "latestVersion",
      headerName: "Latest Version",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          params.value.version && (
            <Link href={params.value.publicLink} target="_blank">
              {params.value.version}
            </Link>
          )
        );
      },
    },
    {
      field: "repoOwner",
      headerName: "Repository Owner",
      flex: 1,
    },
    {
      field: "sourceCodeLink",
      headerName: "Source Code Link",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link href={params.value.value} target="_blank">
            {params.value.isPrivate ? "Private Link" : "Link"}
          </Link>
        );
      },
    },
    {
      field: "previewLink",
      headerName: "Preview Link",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          params.value && (
            <Link href={params.value} target="_blank">
              Link
            </Link>
          )
        );
      },
    },
    {
      field: "programmingLanguage",
      headerName: "Programming Language",
      flex: 1,
    },
  ];
  const serverLinksColumns: GridColDef[] = [
    {
      field: "component",
      headerName: "Component",
      flex: 1,
    },
    {
      field: "link",
      headerName: "Link",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          params.value && (
            <Link href={params.value} target="_blank">
              Link
            </Link>
          )
        );
      },
    },
  ];
  return (
    <ThemeProvider theme={currentTheme}>
      <StyledEngineProvider injectFirst>
        <Paper className={styles.main} square>
          <Typography variant="h2">List of Repositories</Typography>

          {displayRepos ? (
            <DataGrid
              rows={displayRepos}
              columns={repoTableColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
              rowSelection={false}
            />
          ) : (
            <div className={styles.repoSkeletonParent}>
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
              <Skeleton variant="rounded" width="100%" height="3rem" />
            </div>
          )}
          <Typography variant="h2">Server Links</Typography>

          <DataGrid
            rows={serverLinks}
            columns={serverLinksColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20]}
            rowSelection={false}
          />
          {lastUpdatedText && (
            <Typography variant="h6">{lastUpdatedText}</Typography>
          )}
          <Fab
            color="primary"
            aria-label="theme-toggle"
            onClick={toggleThemeState}
            variant="extended"
            className={styles.fab}
          >
            {themeState === "dark"
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"}
          </Fab>
        </Paper>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}
