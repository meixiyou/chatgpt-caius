import { Show, createEffect, createSignal } from 'solid-js'
import IconEnv from './icons/Env'
import IconX from './icons/X'
import SettingsSlider from './SettingsSlider'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
  temperatureSetting: (value: number) => void
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement
  const [temperature, setTemperature] = createSignal(0.6)

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  createEffect(() => {
    props.temperatureSetting(temperature())
  })

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <Show when={props.canEdit()} fallback={<IconEnv />}>
                <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
              </Show>
              <span>角色的作用 ( Temp = {temperature()} ) : </span>
            </div>
            <div class="mt-1">
              {props.currentSystemRoleSettings()}
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>添加角色</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span>角色的作用:</span>
          </div>
          <p class="my-2 leading-normal text-sm op-50 dark:op-60">您可以指导助手，设置助手的行为.</p>
          <div>
            <textarea
              ref={systemInputRef!}
              placeholder="你是一个有用的助手，回答尽可能简洁...."
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div>
          <div class="w-full fi fb">
            <button style="width:80px" onClick={handleButtonClick} gen-slate-btn >
              设置
            </button>
            <div class="w-full ml-2">
              <SettingsSlider
                settings={{
                  name: 'Temperature',
                  type: 'slider',
                  min: 0,
                  max: 2,
                  step: 0.01,
                }}
                editing={() => true}
                value={temperature}
                setValue={setTemperature}
              />
            </div>
          </div>
          <div>
            <div
              style="line-height: 150px;
    width: 100%;
    text-align: center;
    color: #fff;
    height: 150px;
    font-size: 40px;"
            >开发不易，欢迎赞赏
            </div>
            <img src="../../public/weixin.jpg" alt="" />
          </div>
        </div>
      </Show>
    </div>
  )
}
