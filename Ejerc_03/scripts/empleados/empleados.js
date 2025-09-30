let empleados = [

];
export function nuevoEmpelado(id, nombre, departamento, salario) {
    return {id, nombre, departamento, salario};
};
export function agregarEmpleado(empleado) {
    empleados.push(empleado);
};
export function obtenerEmpleados() {
    return empleados;
}
function reordenarIDs() {
    empleados.reduce((acumulador, empleado) => empleado.id = acumulador + 1, -1);
}
export function eliminarEmpleado(id) {
    empleados.splice(empleados.findIndex(empleado => empleado.id === id), 1);
    // reordeno los empleados para evitar duplicados
    reordenarIDs();
};
export function buscarPorDepartamento(departamento) {
    return empleados.filter((empleado) => {
        if (empleado.departamento === departamento) return empleado;
        return;
    });
};
export function calcularSalarioPromedio() {
    return Math.floor(empleados.reduce((acumulador, empleado) => empleado.salario + acumulador, 0)/empleados.length);
};
export function obtenerEmpleadosOrdenadosPorSalario() {
    let arrayCopia = empleados;
    return arrayCopia.sort((empleado1, empleado2) => empleado2.salario - empleado1.salario); // mayor a menor
}