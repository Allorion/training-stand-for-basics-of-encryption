export const convertDate = (dateNum: number | null | string | undefined) => {

    if (dateNum === null || dateNum === undefined) return ''

    const date = new Date(dateNum)

    const options: any = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };

    return date.toLocaleString("ru", options)
}