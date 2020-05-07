[@bs.val] external __dirname: string = "__dirname";

let getAbsolutePath = (path: string): string =>
  Node.Path.resolve(__dirname, path);

let padText = (padding: int, text: string): string =>
  String.make(padding, ' ') ++ text;

let filterItemsList = (~ignore=?, itemsList: list(Fs.dirent)) => {
  switch (ignore) {
  | None => itemsList
  | Some(nameToIgnore) =>
    itemsList
    |> List.filter(item => !item##isDirectory() || item##name != nameToIgnore)
  };
};

let rec printDir = (~padding: int, ~ignore=?, dir: string): unit => {
  let absPath = getAbsolutePath(dir);
  let options = Fs.readdirSyncOptions(~withFileTypes=true, ());

  Fs.readdirSync(absPath, options)
  |> Array.to_list
  |> filterItemsList(~ignore?)
  |> List.iter((item: Fs.dirent) =>
       if (!item##isDirectory()) {
         {js|🗎|js} ++ " " ++ item##name |> padText(padding) |> Js.log;
       } else {
         {js|📁|js} ++ " " ++ item##name |> padText(padding) |> Js.log;
         printDir(
           ~padding=padding + 1,
           ~ignore?,
           absPath ++ "/" ++ item##name,
         );
       }
     );
};
