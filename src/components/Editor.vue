<script setup lang="ts">
  import { EditorView } from 'codemirror'
  import { Decoration } from '@codemirror/view'
  import { StateEffect, StateField } from '@codemirror/state'
  import type { DecorationSet } from '@codemirror/view'

  const props = defineProps<{ matches?: RegExpMatchArray[] }>()

  const divRef = ref<HTMLDivElement | null>()
  const content = defineModel<string>()

  const addUnderline = StateEffect.define<{ from: number, to: number, color: string }>()
  const clearUnderline = StateEffect.define<null>()
  const underlineField = StateField.define<DecorationSet>({
    create() {
      return Decoration.none
    },
    update(underlines, tr) {
      underlines = underlines.map(tr.changes)

      for (const e of tr.effects) {
        if (e.is(addUnderline)) {
          const { from, to, color } = e.value
          const underlineMark = Decoration.mark({ class: `match cm-underline-${color}` })
          underlines = underlines.update({
            add: [underlineMark.range(from, to)]
          })
        } else if (e.is(clearUnderline)) {
          underlines = Decoration.none
        }
      }

      return underlines
    },
    provide: f => EditorView.decorations.from(f)
  })

  onMounted(() => {
    const cm = new EditorView({
      parent: divRef.value,
      doc: content.value,
      extensions: [
        EditorView.lineWrapping,
        underlineField,
        // 监听文档变化
        EditorView.updateListener.of(update => {
          if (update.docChanged)
            content.value = update.state.doc.toString()
        })
      ]
    })

    watch(
      () => props.matches,
      (matches = []) => {
        console.log('matches', matches)
        cm.dispatch({
          effects: [
            clearUnderline.of(null),
            ...matches.map((item, index) => {
              const from = item.index
              const to = from + item[0].length
              if (from === to)
                return null
              const color = index % 2 === 0 ? 'orange' : 'green'
              return addUnderline.of({ from, to, color })
            }).filter(Boolean)
          ]
        })
      },
      {
        immediate: true
      }
    )
  })
</script>

<template>
  <div ref="divRef" />
</template>

<style lang="postcss">
.cm-editor{
  @apply outline-none
}

.cm-focused {
  outline: none !important
}

.cm-line{
  @apply font-mono text-sm
}

.source .cm-line{
  @apply text-gray-400
}

.match{
  color:#000
}

.cm-underline-orange{
  text-decoration: underline 2px #f87171;
  text-underline-offset: 3px;
}

.cm-underline-green{
  text-decoration: underline 2px #ea580c;
  text-underline-offset: 3px;
}
</style>
