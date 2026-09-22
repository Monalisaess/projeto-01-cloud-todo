import ListaDeTarefas from '../components/ListaDeTarefas';

function TodasAsTarefas({ tarefas, onToggle, onRemove }) {
  return (
    <>
      <h2>Todas as Tarefas</h2>
      <ListaDeTarefas
        tarefas={tarefas}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    </>
  );
}

export default TodasAsTarefas;