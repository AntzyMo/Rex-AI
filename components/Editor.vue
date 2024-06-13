<script setup lang="ts">
  import { EditorView } from 'codemirror'
  import { Decoration, placeholder } from '@codemirror/view'
  import { EditorState, StateEffect, StateField } from '@codemirror/state'
  import type { DecorationSet } from '@codemirror/view'

  const props = defineProps<{ matches?: RegExpMatchArray[], readOnly?: boolean, placeholder?: string, loading?: boolean }>()

  const divRef = ref<HTMLDivElement | null>()
  const [text, textModifiers] = defineModel<string>({
    set(value) {
      if (textModifiers.trim) {
        return value.trim()
      }
      return value
    }
  })

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
      parent: divRef.value!,
      doc: text.value,
      extensions: [
        EditorView.lineWrapping,
        underlineField,
        // 监听文档变化
        EditorView.updateListener.of(update => {
          if (update.docChanged)
            text.value = update.state.doc.toString()
        }),
        EditorState.readOnly.of(props.readOnly),
        placeholder(props.placeholder || '')
      ]
    })

    watch(text, val => {
      if (val !== cm.state.doc.toString()) {
        cm.dispatch({
          changes: { from: 0, to: cm.state.doc.length, insert: val }
        })
      }
    })

    watch(
      () => props.matches,
      (matches = []) => {
        cm.dispatch({
          effects: [
            clearUnderline.of(null),
            ...matches.map(item => {
              const from = item.index ?? 0
              const to = from + item[0].length
              if (from === to)
                return null
              return addUnderline.of({ from, to, color: 'red' })
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
  <div ref="divRef" class="relative">
    <div v-if="loading" i-svg-spinners:6-dots-rotate class=" absolute top-1 right-1 text-gray-500" />
  </div>
</template>

<style lang="postcss">
.cm-editor{
  @apply outline-none
}

.cm-focused {
  outline: none !important
}

.cm-line{
  @apply font-mono text-xs
}

.fullResult .cm-line{
  @apply  leading-5
}

.source .cm-line{
  @apply text-gray-400/80
}

.match{
  color:#000
}

.cm-underline-red{
  text-decoration: underline 2px #f87171;
  text-underline-offset: 3px;
}
</style>
