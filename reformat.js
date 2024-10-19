import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'

async function main() {
    const dir = import.meta.dirname
    const file = resolve(dir, '300.json')
    const data = await readFile(file, 'utf8')
    const poems = JSON.parse(data)
    poems.forEach(p=> {
        const contents = p.contents
        let lines = contents.split('\n')
        lines = lines.map( line => {
            return line.replaceAll(/[。！？，]/g, ' ') .trim()
            .replaceAll(' ', '.')
        })
        p.contents = lines.join('|')
    })
    await writeFile(resolve(dir, 'poems.json'), JSON.stringify(poems, null, 2))
}

main()