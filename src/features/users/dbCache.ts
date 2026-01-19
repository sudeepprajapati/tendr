import { getGlobalTag, getIdTag, getUserTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

const CACHE_PROFILE = "default"

export function getUserGlobalTag() {
    return getGlobalTag("users")
}

export function getUserIdTag(id: string) {
    return getIdTag("users", id)

}

export function revalidateUserCache(id: string) {
    revalidateTag(getUserGlobalTag(), CACHE_PROFILE)
    revalidateTag(getUserIdTag(id), CACHE_PROFILE)
}