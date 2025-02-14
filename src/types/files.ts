export type FileItem = {
  name: string;
  type: "file";
  url: string | null;
  size: string;
  modified: string;
};

export type FolderItem = {
  name: string;
  type: "folder";
  contents: (FileItem | FolderItem)[];
};

export type DriveItem = FileItem | FolderItem;
