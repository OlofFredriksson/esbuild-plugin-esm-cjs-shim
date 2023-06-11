const getImportMetaUrl = () =>
    require("url").pathToFileURL(__filename).toString();

export const importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
