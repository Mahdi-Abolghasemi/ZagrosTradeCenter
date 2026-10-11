export type Case_type = {
    _id: string,
    title: string,
    describe: string,
    ownerName: string,
    picturePath: string,
    address: string,
    ownerEmail: string,
    status: string,
}

export type resultUploadImg = {
    success: boolean,
    imgPath: string
}