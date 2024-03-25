"use client";

import type { Repositories, Repository } from "../types/Repositories";
import repositories from "../config/repositories";
import linkToFetchLastUpdatedOn from "../config/lastUpdatedOn";
import serverLinks from "@/config/serverLinks";
import { Key, useEffect, useState } from "react";
import config from "../config/config";
import type ThemeState from "@/types/ThemeState";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Link,
  Spinner,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { ServerLink } from "@/types/ServerLinks";
import { introText, teamMembers } from "../config/teamMembers";

export default function Home() {
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
    // get stuff from local storage
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
  const getCellValueForServerLinks = (item: ServerLink, key: Key) => {
    if (key === "component") {
      return <>{item.component}</>;
    } else if (key === "link") {
      return (
        <Button
          href={item.link}
          as={Link}
          color="primary"
          showAnchorIcon
          variant="solid"
          target="_blank"
          size="sm"
        >
          Open
        </Button>
      );
    } else {
      console.error(
        `Invalid values in getCellValueForServerLinks: item: ${item}, key: ${key}.`
      );
      return <>unknown error</>;
    }
  };
  const getCellValueForRepositories = (item: Repository, key: Key) => {
    if (key === "repoName") {
      return <>{item.repoName}</>;
    } else if (key === "latestVersion") {
      return item.latestVersion.type !== "empty" ? (
        <Button
          href={item.latestVersion.publicLink}
          as={Link}
          color="primary"
          showAnchorIcon
          variant="solid"
          target="_blank"
          size="sm"
        >
          {item.latestVersion.version}
        </Button>
      ) : (
        <></>
      );
    } else if (key === "repoOwner") {
      return <>{item.repoOwner}</>;
    } else if (key === "sourceCodeLink") {
      return (
        <Button
          href={item.sourceCodeLink.value}
          as={Link}
          color={item.sourceCodeLink.isPrivate ? "default" : "primary"}
          showAnchorIcon
          variant="solid"
          target="_blank"
          size="sm"
        >
          {item.sourceCodeLink.isPrivate ? "Private Link" : "Open"}
        </Button>
      );
    } else if (key === "previewLink") {
      return item.previewLink ? (
        <Button
          href={item.previewLink}
          as={Link}
          color="primary"
          showAnchorIcon
          variant="solid"
          target="_blank"
          size="sm"
        >
          Open
        </Button>
      ) : (
        <></>
      );
    } else if (key === "programmingLanguage") {
      return <>{item.programmingLanguage}</>;
    } else {
      console.error(
        `Invalid values in getCellValueForServerLinks: item: ${item}, key: ${key}.`
      );
      return <>unknown error</>;
    }
  };
  // use effect
  useEffect(() => {
    setThemeFromLocalStorage();
    getVersionNumbers();
    getLastUpdatedOn();
    setMounted(true);
  }, []);

  // misc

  const repoTableColumns = [
    {
      field: "repoName",
      headerName: "Repository Name",
    },
    {
      field: "latestVersion",
      headerName: "Latest Version",
    },
    {
      field: "repoOwner",
      headerName: "Repository Owner",
    },
    {
      field: "sourceCodeLink",
      headerName: "Source Code Link",
    },
    {
      field: "previewLink",
      headerName: "Preview Link",
    },
    {
      field: "programmingLanguage",
      headerName: "Programming Language",
    },
  ];

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
    <main className="p-4">
      <Accordion defaultExpandedKeys={["1", "2", "3"]} selectionMode="multiple">
        <AccordionItem
          key="1"
          aria-label="Accordion with intro"
          title="Introduction to Lapa"
        >
          <div className="m-4 flex gap-4 flex-col">
            <p className="text-justify">{introText}</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
              {teamMembers.map((teamMember) => {
                return (
                  <Card key={teamMember.id}>
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src={teamMember.imageSrc}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {teamMember.name}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            @{teamMember.userName}
                          </h5>
                        </div>
                      </div>
                      <Button
                        href={teamMember.link}
                        as={Link}
                        color="primary"
                        showAnchorIcon
                        variant="solid"
                        target="_blank"
                        size="sm"
                      >
                        More
                      </Button>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400 m-2">
                      <p>{teamMember.about}</p>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </div>
        </AccordionItem>

        <AccordionItem
          key="2"
          aria-label="Accordion with repo links"
          title="List of Repositories"
        >
          {displayRepos ? (
            <Table aria-label="Table with repo links" className="m-4 w-max">
              <TableHeader columns={repoTableColumns}>
                {(column) => (
                  <TableColumn key={column.field}>
                    {column.headerName}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={displayRepos}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>
                        {getCellValueForRepositories(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="flex items-center justify-center h-40">
              <Spinner />
            </div>
          )}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion with server links"
          title="Server Links"
        >
          <Table aria-label="Table with server links" className="m-4 w-max">
            <TableHeader columns={serverLinksColumns}>
              {(column) => (
                <TableColumn key={column.field}>
                  {column.headerName}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={serverLinks}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>
                      {getCellValueForServerLinks(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </AccordionItem>
      </Accordion>

      {lastUpdatedText && <p>{lastUpdatedText}</p>}

      <Button
        color="primary"
        aria-label="theme-toggle"
        onClick={toggleThemeState}
        className="fixed bottom-4 right-4"
      >
        {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Button>
    </main>
  );
}
