import "styled-components";

// and extend them!
declare module "styled-componets" {
    export interface DefaultTheme {
        bgColor: string;
        boardColor: string;
        cardColor: string;
    }
}
