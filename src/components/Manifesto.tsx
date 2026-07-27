const method = ['发现信号', '组织叙事', '推动增长'] as const

export function Manifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-title">
      <p className="section-kicker">APPROACH / 方法</p>
      <h2 id="manifesto-title">
        <span>不止生产内容，</span>
        <span>更建立内容发生的系统。</span>
      </h2>
      <div className="manifesto__footer">
        <p>
          从调研与策略，到影像与平面，再到 AIGC
          工作流。我把信息变成可判断的方向，把方向变成可执行、可传播的作品。
        </p>
        <ol className="method-list">
          {method.map((item, index) => (
            <li key={item}>
              <span>0{index + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
