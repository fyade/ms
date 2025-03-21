export class ViewRealTimeSelDirsDto {
  parentDir!: string;
}

export class ViewRealTimeSelFileDto extends ViewRealTimeSelDirsDto {
  filename!: string;
}

export class ViewRealTimeDirs {
  parentPath!: string;
  filename!: string;
  fullPath!: string;
  type!: string;
  filesize!: number;
}
