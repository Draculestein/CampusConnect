import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "views", "dist/" );
shell.cp( "-R", "config", "dist/" );
shell.cp( "-R", "models", "dist/" );