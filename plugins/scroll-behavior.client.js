import { useRouter } from 'vue-router'

export default function () {
  if (typeof window !== 'undefined') {
    const router = useRouter()

    router.afterEach(async (to, from) => {
      if (to.hash) {
        const targetElement = document.querySelector(to.hash)

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          })
          return
        }
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
}
