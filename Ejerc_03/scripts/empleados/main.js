import { agregarEmpleado, nuevoEmpelado, buscarPorDepartamento, calcularSalarioPromedio, eliminarEmpleado, obtenerEmpleadosOrdenadosPorSalario, obtenerEmpleados } from "./empleados.js";
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Alex', 'IT', 1200));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Cova', 'IT', 1100));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Eneas', 'IT', 1220));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Pepe', 'RRHH', 1600));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Antonio', 'Contabilidad', 2200));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Maria', 'RRHH', 1800));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Sara', 'Contabilidad', 1200));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Marcos', 'Mantenimiento', 1475));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Pablo', 'IT', 1300));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Andrea', 'I+D', 1900));
agregarEmpleado(nuevoEmpelado(obtenerEmpleados().length, 'Pedro', 'Dirección', 2500));

console.table(obtenerEmpleados());

eliminarEmpleado(6);
console.table(obtenerEmpleados());

console.table(buscarPorDepartamento('IT'));

console.log(calcularSalarioPromedio());

console.table(obtenerEmpleadosOrdenadosPorSalario());