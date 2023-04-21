import { ref } from "vue"
import router from "@/router"

const error = ref()

export const useException = () => {
    const setException = (exception) => {
        error.value = exception
        router.push({ name: 'error' })
    }

    return {
        error,
        setException
    }
}