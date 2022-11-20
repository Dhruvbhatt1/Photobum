
export default function Tabs(props) {
    const { labels, selectedLabel, onSelect, classname } = props;
    return (
      <div className={classname}>
        <ul>
            {labels.map((label) => {
                return (
                    <li
                        key={label}
                        className={
                            selectedLabel == label ? "is-active" : "not-active"
                        }
                    >
                        <a
                            onClick={() => {
                            onSelect(label);
                            }}
                        >
                            {label}
                        </a>
                    </li>
                );
            })}
        </ul>
      </div>
    );
  }
  