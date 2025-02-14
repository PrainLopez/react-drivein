"use client";

import { useState } from "react";
import { Folder, File, ChevronRight, Upload } from "lucide-react";
import Link from "next/link";
import type { DriveItem } from "~/types/files";

// Mock data
const mockData: { root: DriveItem[] } = {
  root: [
    {
      name: "Documents",
      type: "folder",
      contents: [
        {
          name: "Work",
          type: "folder",
          contents: [
            {
              name: "Project A",
              type: "file",
              url: "#",
              size: "2.1 MB",
              modified: "2023-05-15",
            },
            {
              name: "Project B",
              type: "file",
              url: "#",
              size: "1.8 MB",
              modified: "2023-05-14",
            },
          ],
        },
        {
          name: "Personal",
          type: "folder",
          contents: [
            {
              name: "Resume.pdf",
              type: "file",
              url: "#",
              size: "534 KB",
              modified: "2023-05-10",
            },
            {
              name: "Budget.xlsx",
              type: "file",
              url: "#",
              size: "1.2 MB",
              modified: "2023-05-12",
            },
          ],
        },
      ],
    },
    {
      name: "Photos",
      type: "folder",
      contents: [
        {
          name: "Vacation",
          type: "folder",
          contents: [
            {
              name: "Beach.jpg",
              type: "file",
              url: "#",
              size: "3.5 MB",
              modified: "2023-05-01",
            },
            {
              name: "Mountain.jpg",
              type: "file",
              url: "#",
              size: "2.8 MB",
              modified: "2023-05-02",
            },
          ],
        },
      ],
    },
    {
      name: "Important.txt",
      type: "file",
      url: "#",
      size: "12 KB",
      modified: "2023-05-16",
    },
  ],
};

export default function Home() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<DriveItem[]>(
    mockData.root,
  );

  const navigateToFolder = (folderName: string) => {
    const newPath = [...currentPath, folderName];
    setCurrentPath(newPath);
    const newFolder = findFolder(newPath);
    if (newFolder) {
      setCurrentFolder(newFolder);
    }
  };

  const navigateToBreadcrumb = (index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    const newFolder = findFolder(newPath);
    if (newFolder) {
      setCurrentFolder(newFolder);
    }
  };

  const findFolder = (path: string[]) => {
    let folder = mockData.root;
    for (const folderName of path) {
      const found = folder.find(
        (item) => item.type === "folder" && item.name === folderName,
      );
      if (found && found.type === "folder") {
        folder = found.contents;
      } else {
        return null;
      }
    }
    return folder;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="mx-2 flex items-center">
            <Link
              href="/"
              onClick={() => {
                setCurrentPath([]);
                setCurrentFolder(mockData.root);
              }}
            >
              <span className="font-bold">My Drive</span>
            </Link>
            {currentPath.map((folder, index) => (
              <div key={index} className="mx-0 flex items-center">
                <ChevronRight className="mx-1 h-4 w-4" />
                <button
                  onClick={() => navigateToBreadcrumb(index)}
                  className="hover:underline"
                >
                  {folder}
                </button>
              </div>
            ))}
          </div>
          <button className="flex items-center space-x-2 rounded-lg bg-cyan-600 px-4 py-2 transition-colors duration-200 hover:bg-gray-600">
            <Upload className="h-5 w-5" />
            <span>Upload</span>
          </button>
        </div>
      </header>
      <main className="p-4">
        <div className="overflow-hidden rounded-lg bg-gray-800">
          <div className="flex items-center border-b border-gray-700 px-4 py-2 font-semibold">
            <div className="flex-grow">Name</div>
            <div className="w-24 text-right">Size</div>
            <div className="w-32 text-right">Modified</div>
          </div>
          {currentFolder.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-4 py-2 transition-colors duration-200 hover:bg-gray-700"
            >
              <div className="flex flex-grow items-center space-x-2">
                {item.type === "folder" ? (
                  <Folder className="h-5 w-5 text-yellow-400" />
                ) : (
                  <File className="h-5 w-5 text-blue-400" />
                )}
                {item.type === "folder" ? (
                  <button
                    onClick={() => navigateToFolder(item.name)}
                    className="hover:underline"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link href={item.url} className="hover:underline">
                    {item.name}
                  </Link>
                )}
              </div>
              <div className="w-24 text-right text-gray-400">
                {item.type === "file" ? item.size : "--"}
              </div>
              <div className="w-32 text-right text-gray-400">
                {item.type === "file" ? item.modified : "--"}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
