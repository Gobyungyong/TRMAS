/**
 * 조건에 따른 tailwindcss 적용
 * 하기 예시와 같이 기본 적용할 className과 조건에 따라 적용할  className을 쉼표(,)로 구분
 *
 * 예시) className={cls(
 *   isOpen === comment.id ? null : "hidden",
 *   "mt-3 flex flex-col mx-8 md:flex-row md:w-3/5"
 * )}
 */

export function cls(...classnames) {
  return classnames.join(" ");
}
