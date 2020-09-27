import request from '@/utils/request'

const asyncRouter = async () => {
        return request({
            url: `/admin/menurolelist`,
            method: "get"
        })
}

export default asyncRouter