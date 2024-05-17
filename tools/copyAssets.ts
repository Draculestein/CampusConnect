import * as shell from "shelljs";

// Copy all the view templates
shell.cp('-u', '.env', "dist/");
shell.cp( "-R", "views", "dist/" );
