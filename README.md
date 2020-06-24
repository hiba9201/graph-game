# Graph Game
Игра, цель которой распутать пересекающиеся ребра графа.

Поигирать можно [здесь](https://hiba9201-graph-game.herokuapp.com/).

## Конфигурация графа

Конфигурация пишется в файле `/config/config.json`. В виде json'а с полями `nodes` и `edges`, где 
`nodes` это объект, поля которого – номера вершин, а значения – объекты с полями `top` (отступ сверху) и 
`left` (отсутп снизу); `edges` – список списков двух вершин, между которыми должно быть ребро.

#### Пример конфигурации:
```json
{
  "nodes": {
    "1": {
      "top": 20,
      "left": 80
    },
    "2": {
      "top": 180,
      "left": 20
    }
  },
  "edges": [
    ["1","2"]
  ]
}
```

Такой файл создаст граф с двумя вершинами, соединенными ребром

## Доступные скрипты

Можно выполнить следующие команды:

### `npm start`

Запускает прилоение в режиме разработки.<br />
Откройте [http://localhost:3000](http://localhost:3000), чтобы посмотреть на него в браузере.

Страница будет перезагружаться при изменениях в коде.<br />
В консоли будут видны ошибки линтинга.

### `npm test`

Запускает тесты в интерактивном режиме.<br />

### `npm run build`

Собирает приложение для продакшена в папку `build`.<br />
Корректно бандлит React для продакшена и оптимизирует сборку для лучшей производительности.

Приложение готово для деплоя!
