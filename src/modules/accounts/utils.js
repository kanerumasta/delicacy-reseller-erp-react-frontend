import { capitalize } from "../inventory2/utils"

export const formatName = (firstname,lastname) => {
    return `${capitalize(firstname)} ${capitalize(lastname)}`
}

