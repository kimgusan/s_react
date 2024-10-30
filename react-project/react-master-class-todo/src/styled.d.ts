import "styled-components";

// and extend them!
declare module "styled-componets" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
    }
}
