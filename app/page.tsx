"use client";
import styles from "../stylesheets/page.module.css";
import type { Repositories, Repository } from "../types/Data";
import repositories from "../config/data";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  Link,
  CircularProgress,
  Typography,
  Paper,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [displayRepos, changeDisplayRepos] = useState<Repositories | undefined>(
    undefined
  );

  const columns: GridColDef[] = [
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

  useEffect(() => {
    getVersionNumbers();
  }, []);

  return (
    <main className={styles.main}>
      <Typography variant="h2">List of Repositories</Typography>

      {displayRepos ? (
        <DataGrid
          rows={displayRepos}
          columns={columns}
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
    </main>
  );
}
